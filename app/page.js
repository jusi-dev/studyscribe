import { Button } from "@/components/ui/button";
import { Book, BookOpen, Library, List, NotebookPen, Search, StickyNote, UploadIcon } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="min-h-screen flex flex-col justify-center text-center pt-20 container bg-blue-500">
        <h1 className="text-white font-bold text-4xl drop-shadow-lg">Transform Your Study Notes: Summarize Your Files by Objectives in Seconds!</h1>
        <p className="text-sec font-semibold text-xl mt-4 drop-shadow-md">Effortlessly convert your lecture notes, articles, and study materials into concise summaries organized by your chosen subjects. Boost your learning efficiency and make studying easier than ever!</p>
        <Button variant="main" size="main" className="mt-8 font-2xl">Get Started</Button>
        <p className="mt-4 text-gray-700 font-semibold">Join thousands of students simplifying their studies today!</p>
      </div>
      
      <div className="w-full flex flex-col text-center container py-12">
        <h2 className="text-3xl text-prim font-bold">How StudyScribe impoves your learing experience</h2>

        <div className="flex flex-col mt-12 gap-y-8">
          <div className="flex flex-col items-center shadow-lg py-10 px-6 rounded-xl">
            <Book size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Stop Reading Over And Over</h3>
            <p className="text-sec font-semibold">Stop reading over and over the same pages to create own summaries. Conentrate on the important things.</p>
          </div>

          <div className="flex flex-col items-center shadow-lg py-10 px-6 rounded-xl">
            <Search size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Filter For Important Things</h3>
            <p className="text-sec font-semibold">Tell StudyScribe which learning objectives you have to learn. StudyScribe will filter the important things.</p>
          </div>

          <div className="flex flex-col items-center shadow-lg py-10 px-6 rounded-xl">
            <BookOpen size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Custom Learning Content</h3>
            <p className="text-sec font-semibold">StudyScribe will create customized learning content based on your needs.</p>
          </div>

          <div className="flex flex-col items-center shadow-lg py-10 px-6 rounded-xl">
            <Library size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">All in One Place</h3>
            <p className="text-sec font-semibold">Manage everything in one place. Don't use multiple tools to achieve the same thing.</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-blue-500 flex flex-col text-center container py-12">
        <h2 className="text-3xl text-white font-extrabold">What You Can Do With StudyScribe</h2>

        <div className="flex flex-col mt-12 gap-y-8">
          <div className="flex flex-col items-center shadow-xl py-10 px-6 rounded-xl bg-slate-50">
            <UploadIcon size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Upload Your Notes</h3>
            <p className="text-sec font-semibold">Upload your study materials, lecture notes, or any other text you want to summarize.</p>
          </div>

          <div className="flex flex-col items-center shadow-xl py-10 px-6 rounded-xl bg-slate-50">
            <List size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Add Your Learning Objectives</h3>
            <p className="text-sec font-semibold">Add your own learning objectives or other goals based on your preferences.</p>
          </div>

          <div className="flex flex-col items-center shadow-xl py-10 px-6 rounded-xl bg-slate-50">
            <NotebookPen size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Create Summaries</h3>
            <p className="text-sec font-semibold">Create summaries based on your learning objectives and other customized points.</p>
          </div>

          <div className="flex flex-col items-center shadow-xl py-10 px-6 rounded-xl bg-slate-50">
            <StickyNote size={64} className="text-sec"/>
            <h3 className="text-prim font-semibold text-xl mt-2 mb-2">Create Flashcards</h3>
            <p className="text-sec font-semibold">Create flashcards based on your learning objectives and other customized points.</p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white flex flex-col text-center container py-12">
        <h2 className="text-3xl text-prim font-bold">Pricing</h2>

        <div className="flex flex-col mt-12 gap-y-8">
          <div className="flex flex-col p-10 w-full border-2 border-prim rounded-xl drop-shadow-xl">
            <p className="text-2xl text-sec font-semibold">Trial</p>
            <p className="text-gray-800 font-light text-sm">Test if StudyScribe matches your needs</p>

            <p className="text-sec font-semibold mt-6 text-2xl">Free <span className="font-normal text-base">(One-Time Use)</span></p>
            <ul className="list-disc list-prim mt-4 text-left mx-4 font-light text-gray-700">
              <li>Upload and summarize 10 pages</li>
              <li>Add 2 learning objectives</li>
              <li>Explore core-features</li>
              <li>No credit card required</li>
            </ul>

            <Button variant="main" size="main" className="mt-8 font-2xl">Try Now</Button>
          </div>
        </div>

        <div className="flex flex-col mt-12 gap-y-8">
          <div className="flex flex-col p-10 w-full border-2 border-prim rounded-xl drop-shadow-xl">
            <p className="text-2xl text-sec font-semibold">Pay-Per-Summarization</p>
            <p className="text-gray-800 font-light text-sm">Don't pay monthly for another service</p>

            <p className="text-sec font-semibold mt-6 text-2xl">$5 <span className="font-normal text-base">per summarization</span></p>
            <ul className="list-disc list-prim mt-4 text-left mx-4 font-light text-gray-700">
              <li>Upload and summarize up to 500 pages</li>
              <li>Detailed and accurate objective-specific summariess</li>
              <li>Unlimited flash cards</li>
              <li>No subscription requried</li>
            </ul>

            <Button variant="main" size="main" className="mt-8 font-2xl">Try Now</Button>
          </div>
        </div>

      </div>

      <div className="w-full bg-blue-500 flex flex-col text-center container py-12">
        <h2 className="text-3xl text-white font-bold">See StudyScribe In Action</h2>

        <div className="flex flex-col mt-12 gap-y-8">
          <div className="w-full bg-gray-500 h-44 text-white flex items-center justify-center">Video Here</div>
        </div>
      </div>

      <div className="w-full bg-slate-100 flex flex-col text-center container py-12">
        <h2 className="text-3xl text-prim font-bold">FAQ</h2>

        <div className="flex flex-col mt-12 gap-y-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sec">Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sec">Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sec">Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sec">Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-sec">Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
