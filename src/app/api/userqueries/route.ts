import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import formidable, { File, Fields, IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { apiConfig } from "./apiConfig"; // Ensure the path is correct

const prisma = new PrismaClient();

export const config = apiConfig;

const uploadDir = "./public/uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const saveFile = async (file: File) => {
  const data = fs.readFileSync(file.filepath);
  const fileName = file.originalFilename ?? `unknown-${Date.now()}`; // Handle null case
  const filePath = path.join(uploadDir, fileName);
  fs.writeFileSync(filePath, data);
  fs.unlinkSync(file.filepath);
  return `/uploads/${fileName}`;
};

const flattenFields = (fields: Fields) => {
  const result: { [key: string]: string } = {};
  for (const key in fields) {
    const value = fields[key];
    if (Array.isArray(value)) {
      result[key] = value[0];
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

// Custom class to mock IncomingMessage
class MockIncomingMessage extends Readable {
  headers: Record<string, string>;
  constructor(buffer: Buffer, headers: Record<string, string>) {
    super();
    this.push(buffer);
    this.push(null); // No more data
    this.headers = headers;
  }
}

export async function GET() {
  try {
    const res = await prisma.userQueries.findMany();
    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET /api/userqueries:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    const stream = req.body as ReadableStream;

    const reader = stream.getReader();

    reader.read().then(function process({ done, value }) {
      if (done) {
        const buffer = Buffer.concat(chunks);
        const headers = Object.fromEntries(req.headers.entries());
        const mockReq = new MockIncomingMessage(buffer, headers);

        const form = new IncomingForm({ keepExtensions: true });

        form.parse(mockReq as any, async (err, fields, files) => {
          if (err) {
            console.error("Error parsing form data:", err);
            resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            return;
          }

          try {
            const {
              referenceNo,
              fullName,
              queryType,
              queryDate,
              queryStatus,
              description,
              appliedLoan,
            } = flattenFields(fields) as { [key: string]: string };

            let fileUrl = "";

            if (files.file) {
              const fileArray = Array.isArray(files.file)
                ? files.file
                : [files.file];
              const file = fileArray[0] as File;
              fileUrl = await saveFile(file);
            }

            const newQuery = await prisma.userQueries.create({
              data: {
                referenceNo: String(referenceNo),
                fullName: String(fullName),
                queryType: String(queryType),
                queryDate: String(queryDate),
                queryStatus: String(queryStatus),
                description: String(description),
                appliedLoan: String(appliedLoan),
                attachments: fileUrl,
              },
            });
            resolve(NextResponse.json(newQuery, { status: 201 }));
          } catch (error: any) {
            console.error("Error in POST /api/userqueries:", error);
            resolve(
              NextResponse.json({ error: error.message }, { status: 500 })
            );
          }
        });

        return;
      }

      chunks.push(value);
      reader.read().then(process);
    });
  });
}

export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { id, queryStatus } = await req.json();

    const updatedQuery = await prisma.userQueries.update({
      where: { id },
      data: { queryStatus },
    });

    return NextResponse.json(updatedQuery, { status: 200 });
  } catch (error: any) {
    console.error("Error in PATCH /api/userqueries:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
