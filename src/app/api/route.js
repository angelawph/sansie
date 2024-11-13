import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Creating a new comment
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
