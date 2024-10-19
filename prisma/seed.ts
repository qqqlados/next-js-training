import path from 'path'
import { prisma } from './prisma-client'
import fs from 'fs'

async function up() {
	const filePath = path.join(__dirname, '/json/users.ts')

	const jsonData = fs.readFileSync(filePath, 'utf-8')
	const items = JSON.parse(jsonData)

	for (const item of items) {
		await prisma.user.createMany({
			data: item,
		})
	}

	console.log('Seeding completed!')
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async e => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
