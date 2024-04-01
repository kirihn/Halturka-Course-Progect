docker run --name HalturkaPostgres -p 5432:5432 -e POSTGRES_USER=HaltAdmin -e POSTGRES_PASSWORD=HaltPass -e POSTGRES_DB=HalturkaDB -d postgres






<!-- ==================================== dependency ==================================== -->

nest new back-end-halturka

yarn add @types/mime --dev

yarn add prisma --save-dev
    prisma init
    yarn add @prisma/client
    prisma generate 
    prisma db push

nest g resource auth --no-spec














