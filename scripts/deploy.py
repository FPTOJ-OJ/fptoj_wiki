import subprocess
import sys
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV_FILE = ROOT / "scripts" / ".env"
SITE_DIR = ROOT / "site"
PROJECT_NAME = "fptoj-wiki"


def load_env():
    if not ENV_FILE.exists():
        print(f"[ERROR] Missing {ENV_FILE}")
        print("  Copy scripts/.env.example to scripts/.env and fill in your credentials.")
        sys.exit(1)
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, _, value = line.partition("=")
        os.environ[key.strip()] = value.strip()

    for var in ("CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID"):
        if not os.environ.get(var):
            print(f"[ERROR] {var} is not set in .env")
            sys.exit(1)


def build():
    print("[1/2] Building site...")
    result = subprocess.run(
        [sys.executable, "-m", "mkdocs", "build"],
        cwd=ROOT,
    )
    if result.returncode != 0:
        print("[ERROR] Build failed.")
        sys.exit(1)
    if not (SITE_DIR / "index.html").exists():
        print("[ERROR] Build failed - site/index.html not found.")
        sys.exit(1)


def deploy():
    print("[2/2] Deploying to Cloudflare Pages...")
    result = subprocess.run(
        f"npx --yes wrangler pages deploy site --project-name={PROJECT_NAME} --commit-dirty=true",
        cwd=ROOT,
        shell=True,
    )
    if result.returncode != 0:
        print("[ERROR] Deploy failed.")
        sys.exit(1)


if __name__ == "__main__":
    load_env()
    build()
    deploy()
    print("[OK] Deploy complete!")
