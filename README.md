This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Vercelでの自動再ビルド設定

YouTubeの更新をサイトに反映させるには、VercelのDeploy Hooksを利用して定期的に再ビルドを実行するように設定してください。

1. **Deploy Hookの作成**:
   - Vercelのプロジェクト設定 > Git > Deploy Hooks で新しいHookを作成します（例：`youtube-sync`）。
   - 生成されたURLをコピーします。

2. **定期実行の設定 (GitHub Actions例)**:
   - `.github/workflows/rebuild.yml` を作成し、以下のように記述します（毎日深夜に実行する場合）。

```yaml
name: Scheduled Rebuild
on:
  schedule:
    - cron: '0 15 * * *' # 日本時間 0:00 (UTC 15:00)
  workflow_dispatch: # 手動実行も可能にする

jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        run: curl -X POST ${{ secrets.VERCEL_DEPLOY_HOOK_URL }}
```

3. **シークレットの設定**:
   - GitHubのリポジトリ設定 > Secrets and variables > Actions で `VERCEL_DEPLOY_HOOK_URL` を追加し、Vercelで生成したURLを貼り付けます。

## Vercel Cronでの自動再ビルド設定

VercelのCron Jobs機能を使用して、1日1回自動的に再ビルドを実行することも可能です。

1. `vercel.json` をプロジェクトのルートに作成し、以下のように記述します：

```json
{
  "crons": [
    {
      "path": "/api/revalidate",
      "schedule": "0 0 * * *"
    }
  ]
}
```

2. `/api/revalidate` エンドポイントを実装し、そこから Vercel Deploy Hook を叩くか、Next.js のリバリデートを実行するように構成します。

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
