import * as React from "react";
import Wrapper from "@/components/wrapper";
import prisma from "@/prisma";

import Hero from "@/components/home/Hero";
import Events from "@/components/home/Events";

async function getEvents() {
	return await prisma.event.findMany({
		include: {
			questions: true,
		},
		orderBy: {
			created: "desc",
		},
	});
}

export async function generateMetadata(params) {
	return {
		title: "interact | Engage, Empower, Evolve – Make Every Interaction Count!",
		description: "Engage, Empower, Evolve – Make Every Interaction Count!",
	};
}

export default async function Page() {
	//const eventsData = getEvents();
	//const [events] = await Promise.all([eventsData]);

	return (
		<Wrapper>
			<Hero />
			<Events />
		</Wrapper>
	);
}
