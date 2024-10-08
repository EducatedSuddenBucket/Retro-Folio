import React from "react";
import { projectData } from "@/data/projectData";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import fs from "fs/promises";
import path from "path";

export async function generateStaticParams() {
  return projectData.map((project) => ({
    slug: project.slug,
  }));
}

async function getProjectContent(contentPath: string) {
  const filePath = path.join(process.cwd(), "public", contentPath);
  const content = await fs.readFile(filePath, "utf8");
  return content;
}

const ProjectPage = async ({ params }: { params: { slug: string } }) => {
  const project = projectData.find((p) => p.slug === params.slug);

  if (!project) {
    return <div>Project not found</div>;
  }

  const content = await getProjectContent(project.contentPath);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-black text-gray-100 font-mono">
      <div className="prose prose-invert prose-gray max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl font-bold mb-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-2xl font-bold mb-3" {...props} />
            ),
            p: ({ node, ...props }) => <p className="mb-4" {...props} />,
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-5 mb-4" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal pl-5 mb-4" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            img: ({ src, alt }) => (
              <Image
                src={src || ""}
                alt={alt || ""}
                width={600}
                height={400}
                className="w-full h-auto my-4"
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ProjectPage;
