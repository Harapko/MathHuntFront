export interface Profile{
  id: string,
  name: string,
  surname: string,
  email: string,
  phoneNumber: string,
  englishLevel: string,
  descriptionSkill: string,
  role: string,
  photoPath: string,
  skillName: string[],
  companyList: Company[],
}

export interface Company {
  id: string,
  tradeName: string,
  dataStart: string,
  dataEnd: string,
  positionUser: string,
  descriptionUsersWork: string,
  appUserId: string,
  appUser: null
}
