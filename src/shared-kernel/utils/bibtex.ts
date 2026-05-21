export function generateBibTeX(publication: {
  title: string;
  authors: string[];
  type: string;
  channel: string;
  publishedDate: string;
  doi?: string;
  arxivId?: string;
}): string {
  const year = publication.publishedDate.split("-")[0];
  const authorField = publication.authors.join(" and ");
  const firstAuthor = publication.authors[0];
  const authorLastName = firstAuthor?.split(" ").pop()?.toLowerCase() ?? "author";
  const key = `${authorLastName}${year}`;

  let entryType = "@misc";
  switch (publication.type) {
    case "journal":
      entryType = "@article";
      break;
    case "conference":
      entryType = "@inproceedings";
      break;
    case "book-chapter":
      entryType = "@incollection";
      break;
    case "thesis":
      entryType = "@phdthesis";
      break;
  }

  const fields = [
    `  author = {${authorField}}`,
    `  title = {${publication.title}}`,
    `  year = {${year}}`,
  ];

  if (publication.channel) {
    fields.push(`  journal = {${publication.channel}}`);
  }

  if (publication.doi) {
    fields.push(`  doi = {${publication.doi}}`);
  }

  if (publication.arxivId) {
    fields.push(`  eprint = {${publication.arxivId}}`);
    fields.push(`  archivePrefix = {arXiv}`);
  }

  return `${entryType}{${key},\n${fields.join(",\n")}\n}`;
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
}
