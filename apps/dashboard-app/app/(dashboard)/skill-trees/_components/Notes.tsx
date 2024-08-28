'use client' 
import React, { useContext, useEffect, useState } from 'react';
import { ConnectionsContext } from '../../../../providers/connections-provider';
import { difficultyToName, fetchDetailsOfPages, fetchDetailsOfPagesWithSummary, selfGradeToName } from '../_action/summary';
import InfoCard from './InfoCard';
import AreaCard from './AreaCard';
import { Input } from '@repo/ui/molecules/shadcn/Input';


const Notes = ({ title, ids,  data}: any) => {

    const [pages, setPages] = useState<any>([]);
    const connectionsContext = useContext(ConnectionsContext);
    const apiToken = connectionsContext?.notionNode?.accessToken
    const [testGrades, setTestGrades] = useState<any>({});
    const [revisionTimeTaken, setRevisionTimeTaken] = useState<any>({});
    const [totalLines, setTotalLines] = useState<number>(0);
    const [averageTestPercentage, setAverageTestPercentage] = useState<number>(0);
    const [averageDifficulty, setAverageDifficulty] = useState<number>(0);
    const [averageSelfGrade, setAverageSelfGrade] = useState<number>(0);
    const [notesToReview, setNotesToReview] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<any>('');
    const [selfGrade, setSelfGrade] = useState<any>('');
    const [totalTestsTaken, setTotalTestsTaken] = useState<number>(0);
    const [totalTimeTakenToReviseAllNotes, setTotalTimeTakenToReviseAllNotes] = useState<number>(0);
    const [totalTimeTakenToReviseNotesToReview, setTotalTimeTakenToReviseNotesToReview] = useState<number>(0);
    const [searchNotes, setSearchNotes] = useState<string>('');

    useEffect(() =>{
        const fetchPages = async () => {
            if (!ids || !apiToken) return;
            const {pages, newTestGrades, totalLines, averageTestPercentage, averageDifficulty, averageSelfGrade, 
              notesToReview,totalTestsTaken,totalTimeTakenToReviseAllNotes, totalTimeTakenToReviseNotesToReview,
              revisionTimeTaken} = await fetchDetailsOfPagesWithSummary(apiToken, ids, data);
            let difficulty = await difficultyToName(averageDifficulty);
            let selfGrade = await selfGradeToName(averageSelfGrade);
            setTotalLines(totalLines);
            setAverageTestPercentage(averageTestPercentage);
            setAverageDifficulty(averageDifficulty);
            setAverageSelfGrade(averageSelfGrade);
            setNotesToReview(notesToReview);
            setPages(pages);
            setTestGrades(newTestGrades);
            setDifficulty(difficulty);
            setSelfGrade(selfGrade);
            setTotalTestsTaken(totalTestsTaken);
            setTotalTimeTakenToReviseAllNotes(totalTimeTakenToReviseAllNotes);
            setTotalTimeTakenToReviseNotesToReview(totalTimeTakenToReviseNotesToReview);
            setRevisionTimeTaken(revisionTimeTaken);
        };
        fetchPages();
    },[ids, apiToken,title,data]);

    const handleSearch = (event:any) => {
        setSearchNotes(event.target.value);
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

  return (
    <div className='overflow-y-auto px-4' onClick={handleClick}>
        {title === "Notes" && <div className='flex items-center justify-center gap-2 flex-wrap italic text-md'>
          <InfoCard name="Notes to Review" value={notesToReview} />
          <InfoCard name="Average Self Grade" value={selfGrade} />
          <InfoCard name="Average Difficulty" value={difficulty} />
          <InfoCard name="Total Lines" value={totalLines} />
          <InfoCard name="Total Tests Taken" value={totalTestsTaken} />
          <InfoCard name="Average Test Percentage" value={averageTestPercentage.toFixed(2)} />
          <InfoCard name="Total Time Taken To Revise All Notes" value={  totalTimeTakenToReviseAllNotes< 60 
                  ? `${totalTimeTakenToReviseAllNotes.toFixed(0)} minutes` 
                  : `${(totalTimeTakenToReviseAllNotes / 60).toFixed(2)} hours`} />
          <InfoCard name="Total Time Taken To Revise Notes To Review" value= {totalTimeTakenToReviseNotesToReview < 60 
                  ? `${totalTimeTakenToReviseNotesToReview.toFixed(0)} minutes` 
                  : `${(totalTimeTakenToReviseNotesToReview / 60).toFixed(2)} hours`}/>
        </div>}
        <Input placeholder='Search Notes' className='w-[70vw] m-4' onChange={handleSearch} value={searchNotes}/>
        <div className='flex-1 overflow-y-auto'>
          {pages && pages.length > 0 ? (
            <div className='flex flex-col'>
              {searchNotes == '' ? pages.map((page: any, index: number) => (
                <AreaCard key={index} type={title} page={page} testGrades={testGrades} revisionTimeTaken={revisionTimeTaken}/>
              )): pages.filter((item:any) => item['Description'].toLowerCase().includes(searchNotes.toLowerCase())).map((page: any, index: number) => (
                <AreaCard key={index} type={title} page={page} testGrades={testGrades} revisionTimeTaken={revisionTimeTaken}/>
            ))}
            </div>
          ) : (
            <p>No {title.toLowerCase()} available.</p>
          )}
        </div>
    </div>
  );
};

export default Notes;
