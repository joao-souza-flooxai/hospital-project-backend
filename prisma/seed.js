import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10)


  const hospitals = await Promise.all([
    prisma.hospital.create({
      data: {
        name: 'Hospital São Lucas',
        location: 'São Paulo - SP',
        status: 'ACTIVE',
      },
    }),
    prisma.hospital.create({
      data: {
        name: 'Hospital Santa Maria',
        location: 'Rio de Janeiro - RJ',
        status: 'ACTIVE',
      },
    }),
    prisma.hospital.create({
      data: {
        name: 'Hospital das Clínicas',
        location: 'Belo Horizonte - MG',
        status: 'ACTIVE',
      },
    }),
    prisma.hospital.create({
      data: {
        name: 'Hospital Beneficência Portuguesa',
        location: 'Curitiba - PR',
        status: 'ACTIVE',
      },
    }),
    prisma.hospital.create({
      data: {
        name: 'Hospital Albert Einstein',
        location: 'Porto Alegre - RS',
        status: 'ACTIVE',
      },
    }),
  ])


  await Promise.all([
    prisma.admin.create({
      data: {
        name: 'Ana Souza',
        email: 'ana.souza@saolucas.com',
        password: hashedPassword,
        hospital_id: hospitals[0].id,
      },
    }),
    prisma.admin.create({
      data: {
        name: 'Carlos Mendes',
        email: 'carlos.mendes@santamaria.com',
        password: hashedPassword,
        hospital_id: hospitals[1].id,
      },
    }),
    prisma.admin.create({
      data: {
        name: 'Fernanda Lima',
        email: 'fernanda.lima@clinicas.com',
        password: hashedPassword,
        hospital_id: hospitals[2].id,
      },
    }),
    prisma.admin.create({
      data: {
        name: 'Roberto Silva',
        email: 'roberto.silva@beneficencia.com',
        password: hashedPassword,
        hospital_id: hospitals[3].id,
      },
    }),
    prisma.admin.create({
      data: {
        name: 'Juliana Pereira',
        email: 'juliana.pereira@einstein.com',
        password: hashedPassword,
        hospital_id: hospitals[4].id,
      },
    }),
  ])

  console.log('Seed concluída.')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
