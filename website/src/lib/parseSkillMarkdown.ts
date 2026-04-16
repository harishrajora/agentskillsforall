export interface MarkdownSection {
  title: string;
  level: number;
  content: string;
}

export function parseMarkdownSections(md: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = md.split(/\r?\n/);
  let current: { title: string; level: number; content: string[] } | null = null;
  const intro: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);

    if (h2) {
      if (current) {
        sections.push({ title: current.title, level: current.level, content: current.content.join("\n").trim() });
      }
      current = { title: h2[1].trim(), level: 2, content: [] };
      continue;
    }
    if (h3) {
      if (current) {
        sections.push({ title: current.title, level: current.level, content: current.content.join("\n").trim() });
      }
      current = { title: h3[1].trim(), level: 3, content: [] };
      continue;
    }

    if (current) {
      current.content.push(line);
    } else {
      intro.push(line);
    }
  }

  if (current) {
    sections.push({ title: current.title, level: current.level, content: current.content.join("\n").trim() });
  }

  const introText = intro.join("\n").trim();
  if (introText) {
    sections.unshift({ title: "Introduction", level: 2, content: introText });
  }

  return sections;
}

export function takeSections(sections: MarkdownSection[], count: number, minContentLength = 100): MarkdownSection[] {
  const result: MarkdownSection[] = [];
  let total = 0;
  for (const s of sections) {
    if (result.length >= count && total >= minContentLength) break;
    result.push(s);
    total += s.content.length;
  }
  return result;
}

export function skipSections(sections: MarkdownSection[], count: number): MarkdownSection[] {
  return sections.slice(count);
}
