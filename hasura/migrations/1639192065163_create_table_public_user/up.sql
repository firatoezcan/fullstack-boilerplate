CREATE TABLE "public"."user" ("id" serial NOT NULL, "email" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("email"));
