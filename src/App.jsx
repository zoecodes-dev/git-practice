import { useState } from "react";

const sections = [
  {
    id: "concept", emoji: "🧠", title: "Git이 뭔지부터", subtitle: "핵심 개념", color: "#7C3AED",
    content: [{
      type: "concept",
      title: "Git = 시간여행 가능한 스냅샷 시스템",
      body: "Git은 파일의 변경 내역을 스냅샷으로 저장하는 분산형 버전 관리 시스템\n\n핵심은 3가지 공간이 있다는 것:",
      diagram: [
        { label: "Working Directory", desc: "지금 편집하는 공간", color: "#FCD34D", icon: "📁" },
        { label: "Staging Area (Index)", desc: "커밋할 변경사항을 모아두는 공간", color: "#34D399", icon: "📋" },
        { label: "Repository (.git)", desc: "스냅샷이 영구 저장되는 공간", color: "#60A5FA", icon: "🗄️" },
      ],
      flow: "수정 → git add → git commit",
    },
    {
    type: "tip",
    title: "🫁 Git 쓸 때 숨쉬듯 해야 하는 것",
    items: [
      { label: "git status", desc: "브랜치 이동 전, 커밋 전, 뭔가 이상할 때 — 항상 먼저. 습관이 안 되면 나중에 꼭 사고 남" },
      { label: "언제 쓰냐면", desc: "switch 하기 전 / add 하기 전 / pull 하기 전 / 뭔가 꼬인 것 같을 때" },
      { label: "왜 중요하냐면", desc: "untracked 파일, 수정 중인 파일이 있는 채로 브랜치 이동하면 변경사항이 딸려가거나 충돌 남" },
    ],
  }],
  },
  {
    id: "setup", emoji: "⚙️", title: "초기 설정", subtitle: "처음 한 번만", color: "#059669",
    content: [
      { type: "commands", title: "글로벌 설정 (처음 한 번만)", commands: [
        { cmd: 'git config --global user.name "Zoe"', desc: "커밋에 찍힐 이름 설정" },
        { cmd: 'git config --global user.email "zoe@email.com"', desc: "커밋에 찍힐 이메일" },
        { cmd: 'git config --global core.editor "code --wait"', desc: "기본 에디터를 VSCode로" },
        { cmd: "git config --list", desc: "설정 확인" },
      ]},
      { type: "commands", title: "저장소 시작", commands: [
        { cmd: "git init", desc: "현재 폴더를 Git 저장소로 초기화" },
        { cmd: "git clone [URL]", desc: "원격 저장소를 로컬로 복제" },
        { cmd: "git clone [URL] my-folder", desc: "폴더명 지정해서 클론" },
      ]},
    ],
  },
  {
    id: "status", emoji: "🔍", title: "상태 확인", subtitle: "제일 자주 쓰는 것들", color: "#D97706",
    content: [
      { type: "commands", title: "현재 상태 파악", commands: [
        { cmd: "git status", desc: "변경된 파일 목록 확인 (가장 자주 씀)" },
        { cmd: "git status -s", desc: "짧게 요약해서 보기" },
        { cmd: "git diff", desc: "Working Directory의 변경사항 상세 보기" },
        { cmd: "git diff --staged", desc: "Staging Area에 올라간 변경사항 보기" },
        { cmd: "git log", desc: "커밋 히스토리 보기" },
        { cmd: "git log --oneline --graph --all", desc: "브랜치 포함 전체 그래프로 보기 ⭐" },
      ]},
      { type: "tip", title: "💡 상태 해석법", items: [
        { label: "?? file.py", desc: "Untracked — Git이 아직 모르는 파일" },
        { label: "M  file.py", desc: "Modified (staged) — 스테이징 완료" },
        { label: " M file.py", desc: "Modified (unstaged) — 수정됐지만 아직 add 안 함" },
        { label: "A  file.py", desc: "Added — 새로 추가된 파일이 staged" },
      ]},
    ],
  },
  {
    id: "basic", emoji: "📸", title: "기본 워크플로우", subtitle: "매일 쓰는 루틴", color: "#2563EB",
    content: [
      { type: "flow", title: "하루의 Git 루틴", steps: [
        { step: "1", action: "git pull", desc: "작업 시작 전 최신 코드 받기", icon: "⬇️" },
        { step: "2", action: "코드 수정", desc: "파일 편집", icon: "✏️" },
        { step: "3", action: "git status", desc: "뭐가 바뀌었는지 확인", icon: "🔍" },
        { step: "4", action: 'git add .', desc: "변경사항 스테이징", icon: "📋" },
        { step: "5", action: 'git commit -m "msg"', desc: "스냅샷 저장", icon: "📸" },
        { step: "6", action: "git push", desc: "원격에 업로드", icon: "⬆️" },
      ]},
      { type: "commands", title: "add & commit 상세", commands: [
        { cmd: "git add .", desc: "모든 변경사항 스테이징" },
        { cmd: "git add file.py", desc: "특정 파일만 스테이징" },
        { cmd: "git add src/", desc: "특정 폴더만 스테이징" },
        { cmd: 'git commit -m "feat: add login API"', desc: "메시지와 함께 커밋" },
        { cmd: 'git commit -am "fix: typo"', desc: "add + commit 한 번에 (새 파일 제외)" },
        { cmd: "git commit --amend", desc: "마지막 커밋 수정 (push 전에만!)" },
      ]},
    ],
  },
  {
    id: "branch", emoji: "🌿", title: "브랜치", subtitle: "팀 협업의 핵심", color: "#16A34A",
    content: [
      { type: "concept", title: "브랜치 = 평행 우주", body: "main 브랜치는 항상 안정적인 상태 유지.\n기능 개발은 feature 브랜치에서 → 완성되면 merge.", diagram: [
        { label: "main", desc: "배포 가능한 안정 버전", color: "#60A5FA", icon: "🏠" },
        { label: "develop", desc: "통합 개발 브랜치", color: "#34D399", icon: "🔧" },
        { label: "feature/login", desc: "기능 단위 작업 브랜치", color: "#F9A8D4", icon: "✨" },
      ]},
      { type: "commands", title: "브랜치 명령어", commands: [
        { cmd: "git branch", desc: "로컬 브랜치 목록" },
        { cmd: "git branch -a", desc: "원격 포함 전체 브랜치 목록" },
        { cmd: "git branch feature/agent-memory", desc: "새 브랜치 생성" },
        { cmd: "git switch feature/agent-memory", desc: "브랜치 이동 (최신 방식) ⭐" },
        { cmd: "git switch -c feature/new-thing", desc: "생성 + 이동 한 번에 ⭐" },
        { cmd: "git branch -d feature/done", desc: "브랜치 삭제 (merge된 것)" },
        { cmd: "git branch -D feature/force", desc: "강제 삭제" },
      ]},
      { type: "tip", title: "💡 브랜치 네이밍 컨벤션 (현업)", items: [
        { label: "feature/기능명", desc: "새 기능 개발" },
        { label: "fix/버그명", desc: "버그 수정" },
        { label: "hotfix/긴급수정", desc: "프로덕션 긴급 패치" },
        { label: "refactor/대상", desc: "리팩토링" },
        { label: "chore/작업명", desc: "빌드/설정 등 기타 작업" },
      ]},
    ],
  },
  {
    id: "merge", emoji: "🔀", title: "Merge & Rebase", subtitle: "브랜치 합치기", color: "#7C3AED",
    content: [
      { type: "commands", title: "Merge — 히스토리 보존", commands: [
        { cmd: "git merge feature/login", desc: "현재 브랜치에 feature/login을 merge" },
        { cmd: "git merge --no-ff feature/login", desc: "머지 커밋 강제 생성 (팀 권장)" },
        { cmd: "git merge --abort", desc: "충돌 났을 때 merge 취소" },
      ]},
      { type: "commands", title: "Rebase — 히스토리 정리", commands: [
        { cmd: "git rebase main", desc: "main의 최신 커밋 위에 내 커밋 재배치" },
        { cmd: "git rebase -i HEAD~3", desc: "최근 3개 커밋 인터랙티브 편집 ⭐" },
        { cmd: "git rebase --abort", desc: "rebase 취소" },
        { cmd: "git rebase --continue", desc: "충돌 해결 후 계속" },
      ]},
      { type: "tip", title: "💡 Merge vs Rebase 언제?", items: [
        { label: "merge --no-ff", desc: "팀 협업 PR/MR → 히스토리 명확하게 남김" },
        { label: "rebase", desc: "로컬 정리 or 내 feature 브랜치 최신화할 때" },
        { label: "⚠️ 주의", desc: "공유된 브랜치(main, develop)는 rebase 금지!" },
      ]},
    ],
  },
  {
    id: "remote", emoji: "☁️", title: "원격 저장소", subtitle: "GitHub 협업", color: "#0891B2",
    content: [
      { type: "commands", title: "원격 관리", commands: [
        { cmd: "git remote -v", desc: "원격 저장소 확인" },
        { cmd: "git remote add origin [URL]", desc: "원격 저장소 연결" },
        { cmd: "git push origin main", desc: "원격에 push" },
        { cmd: "git push -u origin feature/login", desc: "처음 push + upstream 설정" },
        { cmd: "git pull", desc: "fetch + merge 한 번에" },
        { cmd: "git fetch", desc: "원격 변경사항 가져오기 (merge는 안 함)" },
        { cmd: "git push origin --delete feature/old", desc: "원격 브랜치 삭제" },
      ]},
      { type: "tip", title: "💡 pull vs fetch", items: [
        { label: "git pull", desc: "가져와서 바로 merge → 빠르지만 충돌 위험" },
        { label: "git fetch", desc: "가져오기만 함 → 내용 확인 후 수동 merge 가능 (안전)" },
        { label: "현업 권장", desc: "git fetch → git log origin/main → git merge" },
      ]},
    ],
  },
  {
    id: "conflict", emoji: "⚡", title: "충돌 해결", subtitle: "겁먹지 마세요!", color: "#DC2626",
    content: [
      { type: "concept", title: "충돌(Conflict)이란?", body: "같은 파일의 같은 줄을 두 명이 다르게 수정했을 때 Git이 어느 버전을 쓸지 몰라서 물어보는 것.\n\n충돌 파일 안에 이런 게 생김:",
        code: `<<<<<<< HEAD (내 버전)\nresponse = agent.run(query)\n=======\nresponse = agent.execute(query, timeout=30)\n>>>>>>> feature/timeout (상대방 버전)` },
      { type: "flow", title: "충돌 해결 루틴", steps: [
        { step: "1", action: "git status", desc: "충돌 파일 확인", icon: "🔍" },
        { step: "2", action: "파일 열기", desc: "<<<<< ===== >>>>> 마커 찾기", icon: "📄" },
        { step: "3", action: "수동 편집", desc: "원하는 코드로 합치고 마커 삭제", icon: "✏️" },
        { step: "4", action: "git add .", desc: "해결 완료 표시", icon: "✅" },
        { step: "5", action: "git commit", desc: "merge 커밋 완성", icon: "📸" },
      ]},
    ],
  },
  {
    id: "undo", emoji: "⏪", title: "되돌리기", subtitle: "망했을 때 탈출법", color: "#B45309",
    content: [
      { type: "commands", title: "상황별 되돌리기", commands: [
        { cmd: "git restore file.py", desc: "수정한 파일 원상복구 (unstaged)" },
        { cmd: "git restore --staged file.py", desc: "staged 파일을 unstage로" },
        { cmd: "git revert HEAD", desc: "마지막 커밋을 되돌리는 새 커밋 생성 ⭐ (안전)" },
        { cmd: "git reset HEAD~1", desc: "마지막 커밋 취소 (파일은 유지)" },
        { cmd: "git reset --hard HEAD~1", desc: "⚠️ 마지막 커밋 + 파일 변경사항 모두 삭제" },
        { cmd: "git stash", desc: "작업 중인 변경사항 임시 저장" },
        { cmd: "git stash pop", desc: "stash 복원" },
      ]},
      { type: "tip", title: "💡 reset vs revert", items: [
        { label: "git revert", desc: "히스토리 보존 → 팀 협업/공유 브랜치에서 사용 ✅" },
        { label: "git reset", desc: "히스토리 삭제 → 로컬/혼자 쓸 때만, push 전에만!" },
        { label: "⚠️ --hard reset", desc: "파일도 날아감. push한 후엔 절대 금지" },
      ]},
    ],
  },
  {
    id: "commit-msg", emoji: "✍️", title: "커밋 메시지", subtitle: "현업 컨벤션", color: "#0F766E",
    content: [
      { type: "concept", title: "Conventional Commits 형식", body: "현업에서 가장 많이 쓰는 커밋 메시지 표준:",
        code: `<type>(<scope>): <short summary>\n\nfeat(auth): add JWT token refresh logic\nfix(agent): handle timeout error in LLM calls\ndocs(readme): update setup instructions\nrefactor(memory): extract vector store to separate class\ntest(api): add unit tests for agent endpoint\nchore(deps): update langchain to 0.2.0` },
      { type: "tip", title: "💡 타입 종류", items: [
        { label: "feat", desc: "새 기능 추가" },
        { label: "fix", desc: "버그 수정" },
        { label: "docs", desc: "문서 변경" },
        { label: "refactor", desc: "기능 변경 없는 코드 개선" },
        { label: "test", desc: "테스트 추가/수정" },
        { label: "chore", desc: "빌드, 의존성, 설정 등" },
        { label: "style", desc: "포매팅, 세미콜론 등 (로직 변경 없음)" },
      ]},
    ],
  },
  {
    id: "workflow", emoji: "🏢", title: "팀 협업 워크플로우", subtitle: "AI 스타트업 현업 기준", color: "#4F46E5",
    content: [
      { type: "flow", title: "GitHub Flow (소규모 팀 권장)", steps: [
        { step: "1", action: "git switch -c feature/agent-rag", desc: "main에서 feature 브랜치 생성", icon: "🌿" },
        { step: "2", action: "개발 + commit", desc: "작은 단위로 자주 커밋", icon: "📸" },
        { step: "3", action: "git push origin feature/agent-rag", desc: "원격에 push", icon: "⬆️" },
        { step: "4", action: "Pull Request 생성", desc: "GitHub에서 PR 열기 + 설명 작성", icon: "📬" },
        { step: "5", action: "Code Review", desc: "팀원 리뷰 → 피드백 반영", icon: "👀" },
        { step: "6", action: "Merge to main", desc: "승인 후 main에 merge", icon: "🔀" },
        { step: "7", action: "브랜치 삭제", desc: "완료된 feature 브랜치 정리", icon: "🗑️" },
      ]},
      { type: "tip", title: "💡 팀 협업 에티켓", items: [
        { label: "작게 커밋", desc: "하나의 커밋 = 하나의 논리적 변경" },
        { label: "자주 push", desc: "로컬에 쌓지 말고 원격에 백업" },
        { label: "PR 전 rebase", desc: "git fetch + git rebase origin/main으로 최신화" },
        { label: "리뷰 요청 전", desc: "직접 diff 한 번 더 확인하기" },
        { label: ".gitignore", desc: ".env, __pycache__, venv 등 반드시 제외" },
      ]},
    ],
  },
  {
    id: "gitignore", emoji: "🙈", title: ".gitignore", subtitle: "올리면 안 되는 것들", color: "#374151",
    content: [
      { type: "concept", title: "AI Agent 개발자 기본 .gitignore", body: "절대 Git에 올리면 안 되는 파일들:",
        code: `# 환경변수 (API 키 절대 금지!)\n.env\n.env.local\n.env.*.local\n\n# Python\n__pycache__/\n*.py[cod]\n*.egg-info/\nvenv/\n.venv/\ndist/\n\n# IDE\n.vscode/settings.json\n.idea/\n*.swp\n\n# 모델/데이터 (용량 큰 것)\n*.pkl\n*.h5\ndata/raw/\nchroma_db/\n\n# OS\n.DS_Store\nThumbs.db` },
    ],
  },
  {
    id: "divider-1",
    type: "divider",
    label: "실전 상황",
  },
  {
    id: "pr-review",
    emoji: "🔍",
    title: "PR 리뷰",
    subtitle: "팀원 코드 로컬에서 보기",
    color: "#0891B2",
    content: [
      {
        type: "flow",
        title: "PR 코드를 내 로컬에서 확인하는 법",
        steps: [
          { step: "1", action: "git fetch origin", desc: "원격 브랜치 목록 새로고침. pull과 달리 내 파일은 건드리지 않는 안전한 명령어", icon: "📡" },
          { step: "2", action: "git switch feature/jihye", desc: "확인할 PR의 브랜치로 이동. fetch 해뒀으니 로컬에 없어도 자동으로 연결됨", icon: "🌿" },
          { step: "3", action: "npm install", desc: ".gitignore에 있는 node_modules는 저장소에 없음 → 브랜치 바꿀 때마다 의존성이 다를 수 있으니 다시 설치", icon: "📦" },
          { step: "4", action: "npm run dev", desc: "로컬 서버 띄워서 직접 테스트. 여기서 수정해도 팀원 원본에는 영향 없음", icon: "🖥️" },
          { step: "5", action: "git restore .", desc: "테스트 중 수정한 게 있으면 초기화 먼저. 안 하면 브랜치 이동 시 변경사항 딸려감", icon: "🧹" },
          { step: "6", action: "git switch feature/eunjin", desc: "리뷰 끝났으면 내 브랜치로 복귀", icon: "🏠" },
        ],
      },
      {
        type: "tip",
        title: "💡 GitHub CLI 쓰면 더 편함",
        items: [
          { label: "gh pr checkout 12", desc: "PR 번호만으로 바로 체크아웃. 브랜치 이름 복사할 필요 없음" },
          { label: "설치", desc: "brew install gh (Mac) / winget install GitHub.cli (Windows)" },
        ],
      },
      {
        type: "tip",
        title: "⚠️ 여기서 자주 막힘",
        items: [
          { label: "switch 전 status 확인", desc: "수정사항 있는 채로 이동하면 변경사항이 딸려가거나 에러 남" },
          { label: "npm install 빠트림", desc: "브랜치마다 package.json이 다를 수 있음. 화면 깨지거나 에러 나면 먼저 의심" },
        ],
      },
    ],
  },
  {
    id: "branch-cleanup",
    emoji: "🗑️",
    title: "브랜치 정리",
    subtitle: "PR merge 후 뒷정리",
    color: "#374151",
    content: [
      {
        type: "flow",
        title: "원격에서 브랜치 삭제된 후 로컬 정리",
        steps: [
          { step: "1", action: "git fetch --prune", desc: "원격에서 삭제된 브랜치를 로컬 목록에서도 제거. 안 하면 없는 브랜치가 계속 보임", icon: "🧹" },
          { step: "2", action: "git switch main", desc: "main으로 이동", icon: "🏠" },
          { step: "3", action: "git pull", desc: "merge된 최신 코드 받기", icon: "⬇️" },
          { step: "4", action: "git branch -d feature/내브랜치", desc: "로컬 브랜치 삭제. -d는 merge된 브랜치만 삭제 (안전)", icon: "🗑️" },
        ],
      },
      {
        type: "tip",
        title: "⚠️ 여기서 자주 막힘",
        items: [
          { label: "fetch --prune 안 함", desc: "git branch -a 했을 때 사라진 원격 브랜치가 계속 보여서 혼란스러움" },
          { label: "-d vs -D", desc: "-d는 merge 안 된 브랜치는 삭제 거부 (안전) / -D는 강제 삭제. 습관적으로 -D 쓰면 작업 날릴 수 있음" },
          { label: "pull 빠트림", desc: "main으로 왔는데 pull 안 하면 팀원 작업이 반영 안 된 옛날 코드 상태" },
        ],
      },
    ],
  },
  {
    id: "main-oops",
    emoji: "🚨",
    title: "main 실수 커밋",
    subtitle: "잘못 넣은 커밋 되돌리기",
    color: "#DC2626",
    content: [
      {
        type: "concept",
        title: "상황",
        body: "main 브랜치에서 작업하다가 실수로 커밋해버림.\nfeature 브랜치로 커밋을 옮기고 main은 되돌려야 함.",
        diagram: [
          { label: "main (지금)", desc: "실수 커밋이 main에 있음", color: "#FCA5A5", icon: "😱" },
          { label: "feature 브랜치", desc: "커밋이 여기 있어야 함", color: "#86EFAC", icon: "✅" },
        ],
      },
      {
        type: "flow",
        title: "해결 순서",
        steps: [
          { step: "1", action: "git log --oneline", desc: "실수로 넣은 커밋의 hash 확인 (앞 7자리)", icon: "🔍" },
          { step: "2", action: "git switch -c feature/새브랜치", desc: "지금 이 상태(실수 커밋 포함)에서 새 브랜치 생성. 커밋이 자동으로 따라옴", icon: "🌿" },
          { step: "3", action: "git switch main", desc: "다시 main으로 복귀", icon: "🏠" },
          { step: "4", action: "git reset HEAD~1", desc: "main에서 마지막 커밋 취소. 파일 내용은 유지됨 (--hard 쓰면 파일도 날아가니 주의)", icon: "⏪" },
          { step: "5", action: "git restore .", desc: "main에 남은 변경사항 초기화", icon: "🧹" },
        ],
      },
      {
        type: "tip",
        title: "⚠️ 주의",
        items: [
          { label: "push 전에만", desc: "이미 main에 push 했으면 reset 금지. 팀원 코드 꼬임. revert 써야 함" },
          { label: "HEAD~1 의미", desc: "마지막 1개 커밋 취소. 2개면 HEAD~2" },
        ],
      },
    ],
  },
  {
    id: "rebase-update",
    emoji: "🔄",
    title: "브랜치 최신화",
    subtitle: "main보다 뒤처졌을 때",
    color: "#7C3AED",
    content: [
      {
        type: "concept",
        title: "상황",
        body: "내가 feature 브랜치에서 작업하는 동안\n팀원들이 main에 계속 merge함.\nPR 올리기 전에 최신 main 위에 내 커밋을 올려야 함.",
        diagram: [
          { label: "main (최신)", desc: "팀원 커밋들이 쌓여있음", color: "#60A5FA", icon: "⬆️" },
          { label: "내 브랜치", desc: "옛날 main 기준으로 만들어짐", color: "#FCD34D", icon: "😅" },
        ],
      },
      {
        type: "flow",
        title: "rebase로 최신화",
        steps: [
          { step: "1", action: "git fetch origin", desc: "원격 main 최신 정보 가져오기", icon: "📡" },
          { step: "2", action: "git switch feature/내브랜치", desc: "내 브랜치로 이동", icon: "🌿" },
          { step: "3", action: "git rebase origin/main", desc: "최신 main 위에 내 커밋 재배치. 히스토리가 깔끔해짐", icon: "🔄" },
          { step: "4", action: "충돌 해결 후 git rebase --continue", desc: "충돌 나면 파일 수정 → git add → git rebase --continue", icon: "⚡" },
          { step: "5", action: "git push --force-with-lease", desc: "rebase 후에는 push가 rejected됨. force-with-lease로 안전하게 강제 push", icon: "⬆️" },
        ],
      },
      {
        type: "tip",
        title: "⚠️ 여기서 자주 막힘",
        items: [
          { label: "force-with-lease vs force", desc: "--force는 남의 push 덮어씀. --force-with-lease는 내가 모르는 변경사항 있으면 거부 → 더 안전" },
          { label: "rebase 중 취소", desc: "중간에 그만하고 싶으면 git rebase --abort → 원래 상태로 복귀" },
          { label: "공유 브랜치엔 금지", desc: "main, develop 등 팀 공유 브랜치는 rebase 절대 금지. 내 feature 브랜치에서만" },
        ],
      },
    ],
  },
  {
    id: "push-rejected",
    emoji: "❌",
    title: "push rejected",
    subtitle: "거부당했을 때",
    color: "#B45309",
    content: [
      {
        type: "concept",
        title: "상황",
        body: "git push 했더니 이런 에러가 남:",
        code: `! [rejected] feature/eunjin -> feature/eunjin (non-fast-forward)\nerror: failed to push some refs\nhint: Updates were rejected because the tip of your current branch is behind`,
      },
      {
        type: "tip",
        title: "원인별 대처법",
        items: [
          { label: "내가 rebase 한 경우", desc: "git push --force-with-lease 사용. 혼자 쓰는 feature 브랜치에서만" },
          { label: "팀원이 같은 브랜치에 push 한 경우", desc: "git fetch → git merge origin/feature/내브랜치 → 충돌 해결 → push" },
          { label: "절대 하면 안 되는 것", desc: "git push --force (--force-with-lease 없이) → 팀원 커밋 덮어씌워서 작업 날릴 수 있음" },
        ],
      },
      {
        type: "tip",
        title: "⚠️ force push 전 체크리스트",
        items: [
          { label: "혼자 쓰는 브랜치인가?", desc: "팀원이 같이 쓰는 브랜치면 force push 금지" },
          { label: "--force-with-lease 쓰는가?", desc: "--force는 쓰지 말 것. 항상 --force-with-lease" },
          { label: "PR이 이미 열려있는가?", desc: "PR 있으면 팀원한테 force push 한다고 미리 알리기" },
        ],
      },
    ],
  },
  {
    id: "commit-clean",
    emoji: "✨",
    title: "커밋 정리",
    subtitle: "PR 전에 깔끔하게",
    color: "#0F766E",
    content: [
      {
        type: "concept",
        title: "상황",
        body: "작업하다 보면 커밋이 지저분하게 쌓임.\nPR 올리기 전에 의미 있는 단위로 정리하면 리뷰어가 고마워함.",
        code: `// 정리 전 (지저분)\nwip\nwip2\nfix typo\nfix typo again\nfinally works\n\n// 정리 후 (깔끔)\nfeat(auth): add JWT login flow`,
      },
      {
        type: "flow",
        title: "rebase -i로 커밋 정리",
        steps: [
          { step: "1", action: "git log --oneline", desc: "몇 개 정리할지 확인", icon: "🔍" },
          { step: "2", action: "git rebase -i HEAD~5", desc: "최근 5개 커밋 인터랙티브 편집 시작 (숫자는 상황에 맞게)", icon: "✏️" },
          { step: "3", action: "pick → squash (s)", desc: "에디터에서 합치고 싶은 커밋을 pick에서 s로 변경. 맨 위 커밋은 pick 유지", icon: "🗜️" },
          { step: "4", action: "커밋 메시지 편집", desc: "저장 후 최종 커밋 메시지 작성. Conventional Commits 형식으로", icon: "✍️" },
          { step: "5", action: "git push --force-with-lease", desc: "정리 후 push. rebase했으니 force 필요", icon: "⬆️" },
        ],
      },
      {
        type: "tip",
        title: "💡 에디터 명령어",
        items: [
          { label: "pick (p)", desc: "커밋 그대로 유지" },
          { label: "squash (s)", desc: "위 커밋에 합치기 (메시지도 합침)" },
          { label: "fixup (f)", desc: "위 커밋에 합치기 (메시지는 버림) ← 더 자주 씀" },
          { label: "reword (r)", desc: "커밋 내용은 유지하고 메시지만 수정" },
        ],
      },
    ],
  },  
];

// ── 스타일 상수 ──────────────────────────────────────────────
const S = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    color: "#e2e8f0",
  },
  header: {
    background: "linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    padding: "20px 24px 16px",
  },
  headerRow: { display: "flex", alignItems: "center", gap: "12px" },
  logo: {
    width: "36px", height: "36px", borderRadius: "8px",
    background: "linear-gradient(135deg, #F05033, #EE4B2B)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
    flexShrink: 0,
  },
  h1: { fontSize: "18px", fontWeight: "700", margin: 0, letterSpacing: "-0.01em" },
  subtitle: { fontSize: "11px", color: "#6B7280", margin: "2px 0 0", fontFamily: "system-ui, sans-serif" },
  nav: {
    display: "flex", gap: "6px", padding: "12px 16px", overflowX: "auto",
    borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.2)",
  },
  content: { padding: "20px 16px", maxWidth: "700px", margin: "0 auto" },
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px", padding: "16px",
  },
  cardTitle: {
    margin: "0 0 12px", fontSize: "13px", fontWeight: "600",
    color: "#CBD5E1", fontFamily: "system-ui, sans-serif", letterSpacing: "0.01em",
  },
  body: {
    fontSize: "12px", color: "#94A3B8", margin: "0 0 12px",
    lineHeight: "1.6", fontFamily: "system-ui, sans-serif", whiteSpace: "pre-line",
  },
  cmdWrap: { borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", marginBottom: "8px" },
  cmdRow: { background: "rgba(0,0,0,0.45)", padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px" },
  cmdPrompt: { color: "#4B5563", userSelect: "none", fontFamily: "monospace", fontSize: "13px" },
  cmdText: { color: "#86EFAC", fontFamily: "monospace", fontSize: "13px", wordBreak: "break-all" },
  cmdDesc: { background: "rgba(255,255,255,0.04)", padding: "5px 12px", fontSize: "11px", color: "#6B7280", fontFamily: "system-ui, sans-serif" },
  flowRow: { display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" },
  flowNum: {
    flexShrink: 0, width: "22px", height: "22px", borderRadius: "50%",
    background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "11px", fontWeight: "700", color: "#fff", marginTop: "1px",
  },
  flowAction: {
    display: "inline-block", background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px", padding: "2px 8px", fontSize: "12px", color: "#86EFAC",
    fontFamily: "monospace", marginLeft: "4px",
  },
  flowDesc: { fontSize: "11px", color: "#6B7280", marginTop: "3px", fontFamily: "system-ui, sans-serif" },
  diagramWrap: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "12px" },
  diagramBox: {
    background: "rgba(255,255,255,0.06)", borderRadius: "10px",
    padding: "10px 14px", textAlign: "center", minWidth: "120px",
  },
  diagramArrow: { color: "#4B5563", fontSize: "18px" },
  flowBar: {
    background: "rgba(0,0,0,0.35)", borderRadius: "8px", padding: "8px 14px",
    fontFamily: "monospace", fontSize: "13px", color: "#FCD34D", textAlign: "center",
  },
  tipRow: { display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" },
  tipLabel: {
    flexShrink: 0, background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "6px", padding: "2px 8px", fontSize: "11px", color: "#FCD34D",
    fontFamily: "monospace",
  },
  tipDesc: { fontSize: "12px", color: "#94A3B8", paddingTop: "2px", fontFamily: "system-ui, sans-serif" },
  codeBlock: {
    background: "rgba(0,0,0,0.5)", borderRadius: "10px", padding: "14px",
    fontSize: "12px", color: "#86EFAC", fontFamily: "monospace",
    overflowX: "auto", whiteSpace: "pre-wrap", border: "1px solid rgba(255,255,255,0.08)",
    lineHeight: "1.7",
  },
  footer: { marginTop: "24px", textAlign: "center" },
  footerText: { fontSize: "11px", color: "#374151", fontFamily: "system-ui" },
};

// ── 서브 컴포넌트 ────────────────────────────────────────────
const CommandBlock = ({ commands }) => (
  <div>
    {commands.map((c, i) => (
      <div key={i} style={S.cmdWrap}>
        <div style={S.cmdRow}>
          <span style={S.cmdPrompt}>$</span>
          <span style={S.cmdText}>{c.cmd}</span>
        </div>
        <div style={S.cmdDesc}>{c.desc}</div>
      </div>
    ))}
  </div>
);

const FlowBlock = ({ steps }) => (
  <div>
    {steps.map((s, i) => (
      <div key={i} style={S.flowRow}>
        <div style={S.flowNum}>{s.step}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px" }}>
            <span style={{ fontSize: "14px" }}>{s.icon}</span>
            <code style={S.flowAction}>{s.action}</code>
          </div>
          <div style={S.flowDesc}>{s.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

const DiagramBlock = ({ diagram, flow }) => (
  <div>
    <div style={S.diagramWrap}>
      {diagram.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={S.diagramBox}>
            <div style={{ fontSize: "18px" }}>{d.icon}</div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: d.color, marginTop: "4px" }}>{d.label}</div>
            <div style={{ fontSize: "10px", color: "#6B7280", marginTop: "2px", fontFamily: "system-ui" }}>{d.desc}</div>
          </div>
          {i < diagram.length - 1 && <span style={S.diagramArrow}>→</span>}
        </div>
      ))}
    </div>
    {flow && <div style={S.flowBar}>{flow}</div>}
  </div>
);

const TipBlock = ({ items }) => (
  <div>
    {items.map((item, i) => (
      <div key={i} style={S.tipRow}>
        <code style={S.tipLabel}>{item.label}</code>
        <span style={S.tipDesc}>{item.desc}</span>
      </div>
    ))}
  </div>
);

// ── 메인 컴포넌트 ────────────────────────────────────────────
export default function GitGuide() {
  const [active, setActive] = useState("concept");
  const current = sections.find((s) => s.id === active && s.type !== "divider");

  return (
    <div style={S.page}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.headerRow}>
          <div style={S.logo}>⎇</div>
          <div>
            <h1 style={S.h1}>Git A–Z</h1>
            <p style={S.subtitle}>AI Agent 개발자를 위한 팀 협업 실무 가이드</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {sections.map((s) => {
          if (s.type === "divider") {
            return (
              <div
                key={s.id}
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "0 4px",
                }}
              >
                <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.1)" }} />
                <span style={{
                  fontSize: "10px",
                  color: "#4B5563",
                  fontFamily: "system-ui, sans-serif",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}>
                  {s.label}
                </span>
              </div>
            );
          }
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                flexShrink: 0,
                padding: "6px 12px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "system-ui, sans-serif",
                fontWeight: "500",
                transition: "all 0.15s",
                background: active === s.id ? s.color : "rgba(255,255,255,0.05)",
                color: active === s.id ? "#fff" : "#9CA3AF",
                boxShadow: active === s.id ? `0 0 12px ${s.color}55` : "none",
              }}
            >
              {s.emoji} {s.title}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={S.content}>
        {/* Section header */}
        <div style={{
          marginBottom: "20px", padding: "16px 20px", borderRadius: "12px",
          background: `linear-gradient(135deg, ${current.color}22, ${current.color}0a)`,
          border: `1px solid ${current.color}44`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>{current.emoji}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#F1F5F9" }}>{current.title}</h2>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: current.color, fontFamily: "system-ui" }}>{current.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Blocks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {current.content.map((block, i) => (
            <div key={i} style={S.card}>
              <h3 style={S.cardTitle}>{block.title}</h3>
              {block.body && <p style={S.body}>{block.body}</p>}
              {block.type === "commands" && <CommandBlock commands={block.commands} />}
              {block.type === "flow" && <FlowBlock steps={block.steps} />}
              {block.type === "concept" && block.diagram && <DiagramBlock diagram={block.diagram} flow={block.flow} />}
              {block.type === "tip" && <TipBlock items={block.items} />}
              {block.code && <pre style={S.codeBlock}>{block.code}</pre>}
            </div>
          ))}
        </div>

        <div style={S.footer}>
          <p style={S.footerText}>based on official Git documentation · git-scm.com</p>
        </div>
      </div>
    </div>
  );
}