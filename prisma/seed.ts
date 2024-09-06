import path from 'path'
import { prisma } from './prisma-client'
import fs from 'fs'

async function up() {
	const filePath = path.join(__dirname, '/json/photos.ts')

	const jsonData = fs.readFileSync(filePath, 'utf-8')
	const photos = JSON.parse(jsonData)

	for (const photo of photos) {
		await prisma.photo.createMany({
			data: photo,
		})
	}

	console.log('Seeding completed!')
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "Photo" RESTART IDENTITY CASCADE`
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
