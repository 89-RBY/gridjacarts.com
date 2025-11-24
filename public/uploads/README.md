# Uploads Directory

This directory stores user-uploaded files for the Gridjac Arts platform.

## Structure

- `/uploads/` - General image uploads (portfolio, blog, etc.)
- `/uploads/contracts/` - Partner contract documents (PDFs, Word docs)

## File Management

### Contracts

- **Location**: `public/uploads/contracts/`
- **Naming**: `CONTR-{YEAR}-{PARTNER_ID}-{NUMBER}-{original_filename}`
- **Allowed types**: PDF, DOC, DOCX
- **Max size**: 10MB
- **Uploaded by**: Partners via partner dashboard
- **Managed by**: Admin via admin dashboard

### Images

- **Location**: `public/uploads/`
- **Naming**: `{timestamp}-{random}.{extension}`
- **Allowed types**: JPEG, JPG, PNG, GIF, WEBP
- **Max size**: 5MB
- **Uploaded by**: Admin only

## Important Notes

⚠️ **Git Ignore**: Uploaded files are NOT tracked in git for security and size reasons. Only the directory structure (.gitkeep files) is committed.

⚠️ **Production**: When deploying to production, ensure that:
1. The upload directories exist
2. The server has write permissions
3. You have a backup strategy for uploaded files
4. For serverless deployments (Vercel, Netlify), consider using cloud storage (AWS S3, Cloudflare R2, etc.)

## Backup Strategy

For production environments, it's recommended to:

1. Use cloud storage (S3, R2, Google Cloud Storage)
2. Schedule regular backups
3. Implement file versioning
4. Monitor storage usage

## API Endpoints

- **POST** `/api/upload` - Upload general files (admin only)
- **GET** `/api/upload` - List uploaded files (admin only)
- **POST** `/api/partner/contracts` - Upload contract (partners)
- **GET** `/api/partner/contracts` - List contracts (partners)
- **GET** `/api/admin/contracts` - List all contracts (admin)
