// src/types/member.ts
import { z } from "zod";

export const memberSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo1: z.string().url().optional(),
  photo2: z.string().url().optional(),
  mpId: z.string().optional(),
  politicalParty: z.string().min(1, "กรุณากรอกสังกัดพรรคการเมือง"),
  province: z.string().optional(),
  ministerPosition: z.string().optional(),
  ministry: z.string().optional(),
  workHistory: z.string().min(1, "กรุณากรอกประวัติการทำงาน"),
  achievements: z.string().min(1, "กรุณากรอกผลงานที่ผ่านมา"),
  profileUrl: z.string().url().optional(),
});

export type Member = z.infer<typeof memberSchema>;