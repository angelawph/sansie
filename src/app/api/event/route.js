import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

function createRandomString(length, chars) {
	var result = "";
	for (var i = length; i > 0; --i)
		result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

/**
 * Creating a new event
 * @param request
 * @returns
 */
export async function POST(request) {
	const status = 200;
	let message = "unprocessed";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	outcome = 1;
	message = "no-perms";
	const { event_name } = await request.json();

	outcome = 3;
	message = "success";
	var event_code = createRandomString(
		6,
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	);
	const new_created_event = await prisma.event.create({
		data: { title: event_name, code: event_code },
	});
	if (new_created_event) {
		items.push(new_created_event);
	}
	return NextResponse.json({ status, message, outcome, items });
}

/**
 * Fetches all favourites
 * @param request
 * @returns
 */
export async function GET(request) {
	const status = 200;
	let message = "hello";
	let outcome = 0; // 0: unprocessed, 1: no perms, 2: error, 3: normal completion
	let items = [];

	return NextResponse.json({ status, message, outcome, items });
}
