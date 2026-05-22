import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

const DEV_ORGANIZATION_ID = 'af7572ed-98a6-4dde-ac4c-2b031d407b34';

async function main() {
  await prisma.customer.createMany({
    data: [
      {
        name: 'Rafael',
        lastName: 'Ferreira',
        email: 'rafael.ferreira@email.com',
        phone: '21999123456',
        city: 'Rio de Janeiro',
        state: 'RJ',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Marcos',
        lastName: 'Oliveira',
        email: 'marcos.oliveira@email.com',
        phone: '11988776655',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Bruno',
        lastName: 'Santos',
        email: 'bruno.santos@email.com',
        phone: '31999887766',
        city: 'Belo Horizonte',
        state: 'MG',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Lucas',
        lastName: 'Almeida',
        email: 'lucas.almeida@email.com',
        phone: '41991234567',
        city: 'Curitiba',
        state: 'PR',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Felipe',
        lastName: 'Costa',
        email: 'felipe.costa@email.com',
        phone: '71992345678',
        city: 'Salvador',
        state: 'BA',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'André',
        lastName: 'Moura',
        email: 'andre.moura@email.com',
        phone: '21987654321',
        city: 'Niterói',
        state: 'RJ',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Thiago',
        lastName: 'Rocha',
        email: 'thiago.rocha@email.com',
        phone: '85999881234',
        city: 'Fortaleza',
        state: 'CE',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Gabriel',
        lastName: 'Lima',
        email: 'gabriel.lima@email.com',
        phone: '81999887744',
        city: 'Recife',
        state: 'PE',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Diego',
        lastName: 'Barbosa',
        email: 'diego.barbosa@email.com',
        phone: '61998765432',
        city: 'Brasília',
        state: 'DF',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Vinícius',
        lastName: 'Pereira',
        email: 'vinicius.pereira@email.com',
        phone: '51991239876',
        city: 'Porto Alegre',
        state: 'RS',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'João',
        lastName: 'Nascimento',
        email: 'joao.nascimento@email.com',
        phone: '27999887766',
        city: 'Vitória',
        state: 'ES',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Matheus',
        lastName: 'Cardoso',
        email: 'matheus.cardoso@email.com',
        phone: '62992345678',
        city: 'Goiânia',
        state: 'GO',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Caio',
        lastName: 'Moreira',
        email: 'caio.moreira@email.com',
        phone: '91988776655',
        city: 'Belém',
        state: 'PA',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Leandro',
        lastName: 'Azevedo',
        email: 'leandro.azevedo@email.com',
        phone: '67999881234',
        city: 'Campo Grande',
        state: 'MS',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
      {
        name: 'Eduardo',
        lastName: 'Martins',
        email: 'eduardo.martins@email.com',
        phone: '48991234567',
        city: 'Florianópolis',
        state: 'SC',
        country: 'Brasil',
        organizationId: DEV_ORGANIZATION_ID,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Seed executada com sucesso');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
