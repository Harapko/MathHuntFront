export interface Skill{
  id: string
  skillName: string
}

export interface UserSkill{
  id: string
  skillName: string
  proficiencyLevel: string
}

export interface DeleteSkillToUser{
  userId: string
  skillId: string
}
