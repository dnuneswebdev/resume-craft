ALTER TABLE "reumes" RENAME TO "resumes";--> statement-breakpoint
ALTER TABLE "resumes" DROP CONSTRAINT "reumes_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "customerId" text;--> statement-breakpoint
ALTER TABLE "resumes" ADD CONSTRAINT "resumes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_customerId_unique" UNIQUE("customerId");