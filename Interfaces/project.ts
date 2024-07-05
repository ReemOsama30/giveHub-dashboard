export interface Project {
  id: number;
  title: string;
  description: string;
  fundingGoal: number;
  amountRaised: number;
  categoryId: number;
  categoryName: string;
  charityId: number;
  charityName: string;
  imgUrl: string;
  location: string;
  state: number;
}
