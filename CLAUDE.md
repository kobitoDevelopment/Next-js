# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

これは認証機能付きのNext.js Todoアプリケーションで、学習プロジェクトとして構築されています。使用している技術スタック：
- Next.js 15.3.1（App Router）
- TypeScript（厳密な設定）
- Supabase（PostgreSQLデータベース）
- カスタム認証実装（Cookie使用）
- CSS Modules（Tailwind CSSは使用していません）
- Jest（単体テスト）とPlaywright（E2Eテスト）

## 開発で使用する主要コマンド

```bash
# 開発
npm run dev          # 開発サーバー起動 (http://localhost:3000)

# ビルドと本番環境
npm run build        # 本番用ビルド作成
npm run start        # 本番サーバー起動

# コード品質
npm run lint         # ESLint実行
npm run lint:style   # CSS用Stylelint実行
npm run check        # 全品質チェック実行 (lint + lint:style)

# テスト
npm run test         # Jest単体テスト実行
npm run test:e2e     # Playwright E2Eテスト実行（自動で開発サーバー起動）

# 個別テスト実行
npm test -- --testPathPattern=filename    # 特定のJestテスト実行
npx playwright test filename              # 特定のE2Eテスト実行
```

## アーキテクチャと主要パターン

### 認証フロー
- Supabaseデータベースを使用したカスタム認証（Supabase Authは使用せず）
- `user_id` Cookieによるセッション管理
- ミドルウェア（`middleware.ts`）でルート保護処理
- AuthContext（`src/app/context/AuthContext.tsx`）でクライアントサイド状態管理

### Server Actions vs Route Handlers
コードベースには両方の実装がありますが、**Server Actionsが推奨アプローチ**です：
- 現行: `signin2/`, `signup2/`（Server Actions）
- レガシー: `_signin/`, `_signup/`（Route Handlers）

### ディレクトリ構造
```
src/app/
├── components/     # 共有Reactコンポーネント
├── context/       # React Context（AuthContext）
├── lib/          # 認証ユーティリティ（getUser, setAuth, removeAuth）
├── types/        # TypeScript型定義
├── utils/        # ユーティリティ関数（バリデーション、supabaseクライアント）
├── admin2/       # ユーザー管理機能付き管理パネル
├── mypage2/      # ユーザーダッシュボードとアカウント管理
├── signin2/      # Server Action使用のサインインページ
└── signup2/      # Server Action使用のサインアップページ
```

### データベーススキーマ
Supabaseのusersテーブル：
- `id`（UUID、主キー）
- `email`（ユニーク）
- `password`（bcryptハッシュ化）
- `role`（'admin' | 'user'）
- `created_at`
- `updated_at`

### 重要な実装詳細

1. **認証状態**: `src/app/lib/auth.ts`の`getUser()`で認証チェック
2. **保護されたルート**: ミドルウェアが未認証ユーザーを自動リダイレクト
3. **ロールベースアクセス**: 管理画面は`role === 'admin'`をチェック
4. **フォームバリデーション**: `src/app/utils/validation.ts`のZodスキーマを使用
5. **エラーハンドリング**: Server Actionsの`state.error`でフォームエラー表示
6. **Supabaseクライアント**: `src/app/utils/supabase.ts`で初期化

### テストアプローチ

- 単体テスト：`src/app/__tests__/`でコンポーネントとユーティリティをテスト
- E2Eテスト：`src/app/e2e/`で完全なユーザーフローをテスト
- テストは実際のSupabaseインスタンスを使用（テスト用データベースの設定が必要）

### CSS Modules規約

このプロジェクトはTailwind CSSではなくCSS Modulesを使用：
- コンポーネントスタイル：`ComponentName.module.css`
- インポート：`import styles from './ComponentName.module.css'`
- クラス適用：`className={styles.className}`

### デプロイ

- Vercelでホスティング
- 必要な環境変数：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `AUTH_SECRET_KEY`（Cookie暗号化用）