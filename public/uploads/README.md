# Uploads Directory

This directory stores user-uploaded files for the Gridjac Arts platform.

## Structure

- `/uploads/` - General image uploads (portfolio, blog, etc.)
- `/uploads/contracts/` - ⚠️ **DEPRECATED** - Now uses external volume

## ⚠️ Contract Storage Migration

**Contracts are now stored in an external volume!**

- **Old location**: `public/uploads/contracts/`
- **New location**: `/data_gridjacarts/contracts/` (external volume)
- **Access**: Via API endpoint `/api/contracts/files/[filename]`

## File Management

### Contracts

- **Location**: `/data_gridjacarts/contracts/` (external volume)
- **Environment Variable**: `CONTRACTS_STORAGE_PATH` (defaults to `/data_gridjacarts/contracts`)
- **Naming**: `CONTR-{YEAR}-{PARTNER_ID}-{NUMBER}-{original_filename}`
- **Allowed types**: PDF, DOC, DOCX
- **Max size**: 10MB
- **Uploaded by**: Partners via partner dashboard
- **Managed by**: Admin via admin dashboard
- **Access Method**: Served via `/api/contracts/files/[filename]` endpoint
- **Security**: Authentication required, authorization checked (admin or contract owner)

### Images

- **Location**: `public/uploads/`
- **Naming**: `{timestamp}-{random}.{extension}`
- **Allowed types**: JPEG, JPG, PNG, GIF, WEBP
- **Max size**: 5MB
- **Uploaded by**: Admin only

## Important Notes

⚠️ **Git Ignore**: Uploaded files are NOT tracked in git for security and size reasons. Only the directory structure (.gitkeep files) is committed.

⚠️ **Production Setup**: When deploying to production, ensure that:
1. The external volume is mounted at `/data_gridjacarts/` (or set `CONTRACTS_STORAGE_PATH`)
2. The volume has proper read/write permissions
3. The contracts directory exists: `/data_gridjacarts/contracts/`
4. You have a backup strategy for the volume

⚠️ **Environment Variables**:
```bash
CONTRACTS_STORAGE_PATH=/data_gridjacarts/contracts  # Optional, defaults to this path
```

⚠️ **Migration**: If you have existing contracts in `public/uploads/contracts/`, run:
```bash
npx tsx scripts/migrate-contract-urls.ts
```
This will update database URLs to point to the new API endpoint.

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
