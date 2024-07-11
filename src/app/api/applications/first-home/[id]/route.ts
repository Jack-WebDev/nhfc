import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const user = await db.firstHomeLoan.findMany({
			where: {
				id: params.id,
				
			},
		});
		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}