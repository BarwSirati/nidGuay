
interface Gened {
  basic: number;
  language: number;
  faculty: number;
  elective: number;
}

interface Specific {
  core: number;
  specialized: number;
  options: number;
  branch_elective: number;
}

export interface Credit {
  total: number;
  gened: Gened;
  specific: Specific;
  free_electives: number;
}

