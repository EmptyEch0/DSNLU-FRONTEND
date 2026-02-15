export interface Student {
  name: string;
}

export interface Batch {
  year: string;
  students: Student[];
}

export interface Programme {
  id: string;
  label: string;
  shortLabel: string;
  batches: Batch[];
}

export const certificateVerificationData: Programme[] = [
  {
    id: "ba-llb",
    label: "B.A., LL.B. (Hons.)",
    shortLabel: "B.A., LL.B.",
    batches: [
      {
        year: "2012",
        students: [
          { name: "Abhinav Tewari" },
          { name: "Aditi Tomar" },
          { name: "Aditya Shrivastava" },
          { name: "Akshay Singh Kheriya" },
          { name: "Anjali Arun PS" },
          { name: "Arup Sinha" },
          { name: "Arvind Kumar" },
          { name: "Atin Kumar" },
          { name: "Ayushi B" },
          { name: "Druthi B" },
          { name: "Mownika Cheekati" },
          { name: "Abhilash G" },
          { name: "Aparajita Golla" },
          { name: "Gnana Preethi" },
          { name: "Harsh Vardhan Dhainik" },
          { name: "Harshvardhan Sharma" },
          { name: "Hemanth Kumar Vemuri" },
          { name: "Himanshu Mene" },
          { name: "Jibin James K" },
          { name: "Deevena K" },
          { name: "Ram Sai Charan" },
          { name: "Keshav Pareek" },
          { name: "Kumar Ankit" },
          { name: "Mugdha Tomar" },
          { name: "Nikhil Kumar Singh" },
          { name: "P Rishi Teja" },
          { name: "P Pavan Kumar Rao" },
          { name: "Palakurthirajan" },
          { name: "Prakhar Srivastava" },
          { name: "Prasanth Kumar Verma" },
          { name: "Purnesh Upadhyay" },
          { name: "Pushpanjali Singh" },
          { name: "R Aiswarya Devi" },
          { name: "Rishabh Singh" },
          { name: "Rupali Dube" },
          { name: "S Maneesh" },
          { name: "Sanjay Singh" },
          { name: "Saswata Guha" },
          { name: "Suraj Singh Dhaked" },
          { name: "Swapnil Srivastava" },
          { name: "V Lakshmi Mounica" },
          { name: "Vishnumolaka Chandra Sekhar" },
          { name: "Yeswanthi Reddy A" },
          { name: "Ayushi Srivastava" },
          { name: "Cheruku Sindhura" },
          { name: "Ayush Jaiswal" },
          { name: "D Aparna" },
          { name: "Kunwar Jai Singh" }
        ]
      },
      {
        year: "2013",
        students: [
          { name: "Deepak Sharma" },
          { name: "Megha Gupta" },
          { name: "Rahul Verma" },
          { name: "Sneha Reddy" },
          { name: "Vikram Singh" },
        ]
      },
      {
        year: "2014",
        students: [
          { name: "Anil Kumar" },
          { name: "Bhavna Jain" },
          { name: "Chitra Singh" },
          { name: "Devansh Mehta" },
          { name: "Esha Pandey" },
        ]
      },
      {
        year: "2015",
        students: [
          { name: "Chakka Bhavani" },
          { name: "Shriya" },
          { name: "Sanyam Jain" },
        ]
      },
      {
        year: "2016",
        students: [
          { name: "K Lakshmi Praharshitha" },
          { name: "A MD Faizan" },
          { name: "Aleena Maria Moncy" },
          { name: "Kurra Sravani" },
          { name: "Munnangi Asha Priya" },
          { name: "Yanamala Nagendra" },
        ]
      },
      {
        year: "2017",
        students: [
          { name: "Kalapureddy Yamini Reddy" },
          { name: "Yepuri Sai Chaitanya" },
        ]
      }
    ]
  },
  {
    id: "llm",
    label: "LL.M",
    shortLabel: "LL.M",
    batches: [
      {
        year: "2017",
        students: [
          { name: "Anjali" },
          { name: "Ayush Jaiswal" },
          { name: "Chandini Choudary" },
          { name: "R G Bhaskar" },
          { name: "Hanumanthu" },
          { name: "Hydhavi" },
          { name: "K Snigdha" },
          { name: "Mula Sneha" },
          { name: "Goud Sunita" },
          { name: "Jeet" },
          { name: "Agya Goyal" },
          { name: "Dhyana" },
          { name: "B K S H R Tejachakravarthi" },
        ]
      },
      {
        year: "2018",
        students: [
          { name: "Sai Abhishek" },
          { name: "M M Nageswara Rao" },
        ]
      },
      {
        year: "2019",
        students: [
          { name: "K Siva Kumar" },
          { name: "T S R Praneetha" },
        ]
      },
      {
        year: "2021",
        students: [
          { name: "Shaik Kareemulla" },
        ]
      }
    ]
  },
  {
    id: "lld",
    label: "LL.D",
    shortLabel: "LL.D",
    batches: [
      {
        year: "2017–18",
        students: [
          { name: "Dr. K Soma Sekhar" },
          { name: "Dr. Madabhushanam Sridhar Acharyulu" },
        ]
      },
      {
        year: "2018–19",
        students: []
      }
    ]
  },
  {
    id: "phd",
    label: "Ph.D",
    shortLabel: "Ph.D",
    batches: [
      {
        year: "2016–17",
        students: [
          { name: "Udayasree Kanakala" },
        ]
      },
      {
        year: "2017–18",
        students: [
          { name: "Bendlam Lavaraju" },
          { name: "Sivaramakrishna Reddy G" },
        ]
      },
      {
        year: "2019",
        students: [
          { name: "B Sreedhar Babu" },
        ]
      }
    ]
  }
];
