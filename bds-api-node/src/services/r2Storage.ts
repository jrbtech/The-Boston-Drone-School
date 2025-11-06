// Cloudflare R2 Storage Service
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

class R2StorageService {
  private client: S3Client;
  private bucketName: string;
  private accountId: string;

  constructor() {
    this.accountId = process.env.R2_ACCOUNT_ID!;
    this.bucketName = process.env.R2_BUCKET_NAME!;

    if (!this.accountId || !this.bucketName) {
      throw new Error('R2 configuration missing: R2_ACCOUNT_ID and R2_BUCKET_NAME are required');
    }

    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${this.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
  }

  /**
   * Upload a file to R2
   */
  async uploadFile(
    fileBuffer: Buffer,
    filename: string,
    contentType: string,
    folder?: string
  ): Promise<UploadResult> {
    try {
      const key = folder ? `${folder}/${filename}` : filename;
      
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
        // Make file publicly accessible
        ACL: 'public-read',
      });

      await this.client.send(command);

      // Generate public URL
      const publicUrl = `https://pub-${this.accountId}.r2.dev/${key}`;

      return {
        success: true,
        url: publicUrl,
        key: key,
      };
    } catch (error) {
      console.error('R2 upload failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  /**
   * Get a presigned URL for temporary access to a private file
   */
  async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * Upload course material (PDF, video, etc.)
   */
  async uploadCourseMaterial(
    fileBuffer: Buffer,
    originalFilename: string,
    courseId: string,
    contentType: string
  ): Promise<UploadResult> {
    // Generate safe filename
    const timestamp = Date.now();
    const safeFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeFilename}`;
    
    return await this.uploadFile(
      fileBuffer,
      filename,
      contentType,
      `courses/${courseId}/materials`
    );
  }

  /**
   * Upload FAA reference material
   */
  async uploadFAAMaterial(
    fileBuffer: Buffer,
    originalFilename: string,
    contentType: string
  ): Promise<UploadResult> {
    const timestamp = Date.now();
    const safeFilename = originalFilename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${safeFilename}`;
    
    return await this.uploadFile(
      fileBuffer,
      filename,
      contentType,
      'faa-materials'
    );
  }
}

export const r2Storage = new R2StorageService();
export default r2Storage;