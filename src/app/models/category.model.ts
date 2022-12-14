export enum Category {
  Arhitektura = 1,
  Bastina = 2,
  CivilnoDrustvo = 3,
  Dizajn = 4,
  Edukacija = 5,
  Film = 6,
  Knjiga = 7,
  KulturnaPolitika = 8,
  Mediji = 9,
  Muzika = 10,
  Nauka = 11,
  Pozoriste = 12,
  Strip = 13,
  Tehnologija = 14,
  VizuelnaUmetnost = 15,
}

export const CategoryMap = new Map<number, string>([
  [Category.Arhitektura, 'Arhitektura'],
  [Category.Bastina, 'Bastina'],
  [Category.CivilnoDrustvo, 'Civilno društvo'],
  [Category.Dizajn, 'Dizajn'],
  [Category.Edukacija, 'Edukacija'],
  [Category.Film, 'Film'],
  [Category.Knjiga, 'Knjiga'],
  [Category.KulturnaPolitika, 'Kulturna politika'],
  [Category.Mediji, 'Mediji'],
  [Category.Muzika, 'Muzika'],
  [Category.Nauka, 'Nauka'],
  [Category.Pozoriste, 'Pozorište'],
  [Category.Strip, 'Strip'],
  [Category.Tehnologija, 'Tehnologija'],
  [Category.VizuelnaUmetnost, 'Vizuelna umetnost'],
]);
