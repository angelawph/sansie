import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
/**
 * Registering Upvotes
 * @param request
 * @returns
 */
export async function PUT(request, { params }) {
	const status = 200;
	let message = "unprocessed";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	outcome = 1;
	message = "no-perms";
	const { eventid } = await params;

	const { question } = await request.json();

	const valid_event = await prisma.event.findFirst({
		where: {
			code: eventid,
		},
	});
	if (valid_event) {
		outcome = 2;
		message = "valid-event";
		const question_updated = await prisma.question.update({
			data: {
				votes: { increment: 1 },
			},
			where: {
				id: question,
			},
		});
		if (question_updated) {
			outcome = 3;
			message = "success";
			items.push(question_updated);
		}
	}
	return NextResponse.json({ status, message, outcome, items });
}

/**
 * Marking a question as answered
 * @param request
 * @returns
 */
export async function PATCH(request, { params }) {
	const status = 200;
	let message = "unprocessed";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	const { eventid } = await params;

	outcome = 1;
	message = "no-perms";
	const { answered, question } = await request.json();
	let answered_value = false;
	if (answered == "yes") {
		answered_value = true;
	}
	const valid_event = await prisma.event.findFirst({
		where: {
			code: eventid,
		},
	});
	if (valid_event) {
		outcome = 2;
		message = "valid-event";
		const question_updated = await prisma.question.update({
			data: {
				answered: answered_value,
			},
			where: {
				id: question,
			},
		});
		if (question_updated) {
			outcome = 3;
			message = "success";
			items.push(question_updated);
		}
	}
	return NextResponse.json({ status, message, outcome, items });
}

/**
 * Creating a new event
 * @param request
 * @returns
 */
export async function POST(request, { params }) {
	const status = 200;
	let message = "unprocessed";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	const { eventid } = await params;

	outcome = 1;
	message = "no-perms";
	const { question } = await request.json();

	const valid_event = await prisma.event.findFirst({
		where: {
			code: eventid,
		},
	});
	if (valid_event) {
		outcome = 2;
		message = "valid-event";
		const question_created = await prisma.question.create({
			data: {
				event: {
					connect: {
						id: valid_event.id,
					},
				},
				content: question,
			},
		});
		if (question_created) {
			outcome = 3;
			message = "success";
			items.push(question_created);
		}
	}
	return NextResponse.json({ status, message, outcome, items });
}

/**
 * Fetches all favourites
 * @param request
 * @returns
 */
export async function GET(request, { params }) {
	const status = 200;
	let message = "hello";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	const { eventid } = await params;

	return NextResponse.json({ status, message, outcome, items });
}
