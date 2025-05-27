import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {

  const hashedPassword = await bcrypt.hash('123456', 10)


  const hospitals = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.hospital.create({
        data: {
          name: `Hospital ${i + 1}`,
          location: `Cidade ${i + 1}`,
          status: 'ACTIVE',
        },
      })
    )
  )

  const admins = await Promise.all(
    hospitals.map((hospital, i) =>
      prisma.admin.create({
        data: {
          name: `Admin ${i + 1}`,
          email: `admin${i + 1}@email.com`,
          password: hashedPassword,
          hospital_id: hospital.id,
        },
      })
    )
  )

  const positions = []
  for (const hospital of hospitals) {
    const admin = admins.find((a) => a.hospital_id === hospital.id)

    for (let i = 0; i < 4; i++) {
      const position = await prisma.position.create({
        data: {
          title: `Position ${i + 1} - ${hospital.name}`,
          description: `Descrição da posição ${i + 1} do ${hospital.name}`,
          status: 'ACTIVE',
          type: i % 2 === 0 ? 'IDOSOS' : 'JOVENS',
          spots: 5,
          score:  i % 2 === 0 ? 500 : 300,
          hospital_id: hospital.id,
          created_by_admin: admin.id,
        },
      })
      positions.push(position)
    }
  }

  // Criar users
  const users = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.user.create({
        data: {
          name: `User ${i + 1}`,
          document: `0000000000${i + 1}`,
          email: `user${i + 1}@email.com`,
          password: hashedPassword,
          age: 20 + i,
          gender: i % 2 === 0 ? 'MALE' : 'FEMALE',
          location: `Cidade ${i + 1}`,
          score: 0,
        },
      })
    )
  )


  for (const user of users) {
    const randomPositions = positions.sort(() => 0.5 - Math.random()).slice(0, 3)

    for (const pos of randomPositions) {
      await prisma.application.create({
        data: {
          user_id: user.id,
          positions_id: pos.id,
          status: 'PENDING',
        },
      })
    }
  }

}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
