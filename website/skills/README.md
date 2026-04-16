# Skills content (local data source)

The UI reads all skills from this folder. No remote fetch is used.

## Layout

- **`index.json`** — Required. Same shape as the previous API response:
  - `name`, `description`, `repository` (optional), `total_skills`, `categories` (string[]), `skills` (array).
  - Each skill in `skills[]` must have: `name`, `path`, `description`, `category`, `languages` (array), `files: { skill_md: "SKILL.md", reference?: string[] }`.
  - `path` must match the name of the skill’s subfolder under `skills/`
- **`<path>/`** — One subfolder per skill. Folder name = `skill.path` (e.g. `selenium-automation-skill`).
  - **`SKILL.md`** — Required. Main content: overview and documentation. Front matter can supply description.
  - **`playbook.md`** — Optional. If present, the “Playbook” tab is shown; if the file is missing, the tab is hidden.
  - **`advanced-patterns.md`** — Optional. If present, the “Advanced patterns” tab is shown; if missing, the tab is hidden.
  - **`cloud-integration.md`** — Optional. If present, the “Cloud integration” tab is shown; if missing, the tab is hidden.

**Tab visibility rule:** A tab (Playbook, Advanced patterns, Cloud integration) is only visible when the corresponding file exists in that skill’s directory. The app checks the filesystem; `index.json` does not control which tabs appear.

## File-to-subpage mapping

| Tab / Route          | Source file(s) |
|----------------------|----------------|
| Overview             | SKILL.md + playbook (first sections) + advanced-patterns |
| Documentation        | SKILL.md (code blocks stripped) |
| Playbook             | playbook.md |
| Advanced patterns    | advanced-patterns.md |
| Cloud integration    | cloud-integration.md |

URL slug (e.g. `selenium-skill`) is derived from `path` (e.g. `selenium-automation-skill`) by the app; you don’t need to rename folders for URLs.
