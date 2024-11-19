import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Creating a new comment
 * @param request
 * @returns
 */
export async function PATCH(request) {
	const status = 200;
	let message = "unprocessed";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	outcome = 1;
	message = "no-perms";

	return NextResponse.json({ status, message, outcome, items });
}

/**
 * Renders all the events
 * @param request
 * @returns
 */
export async function GET(request) {
	const status = 200;

	let message = "not-run";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion

	const q = request.nextUrl.searchParams.get("q");

	console.log("q is: " + q);

	message = "success";
	outcome = 3;

	const items = await prisma.event.findMany({
		include: {
			questions: true,
		},
		where: {
			deleted: false,
			...(
				q ? { 
					OR: [
						{
							code: {
								contains: q,
								mode: 'insensitive',
							},
						},
						{
							title: {
								contains: q,
								mode: 'insensitive',
							},
						},
					]
				} : {
				}
			),
		},
		orderBy: {
			created: "desc",
		},
	});

	return NextResponse.json({ status, message, outcome, items });
}

