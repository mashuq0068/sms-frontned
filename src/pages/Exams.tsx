/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import examsData from '@/mock/exams.json';
import { Calendar, FileText, Plus } from 'lucide-react';
import { EnterMarksForm } from '@/components/forms/EnterMarksForm';

const Exams = () => {
  const [selectedExam, setSelectedExam] = useState<any>(null);
  
  const getStatusColor = (status: string) => {
    return status === 'Upcoming' 
      ? 'bg-warning/40 text-foreground/70' 
      : 'bg-muted/30 text-foreground/70';
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium">Exams & Marks</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage examinations and student performance</p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Add Exam
          </Button>
        </div>

        <div className="grid gap-4">
          {examsData.map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {exam.name}
                    </CardTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exam.startDate} to {exam.endDate}
                      </span>
                      <Badge variant="outline">{exam.class}</Badge>
                    </div>
                  </div>
                  <Badge className={getStatusColor(exam.status)}>{exam.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="font-medium">Subjects:</p>
                  <div className="grid gap-2">
                    {exam.subjects.map((subject, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{subject.name}</p>
                          <p className="text-sm text-muted-foreground">{subject.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Max Marks: {subject.maxMarks}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full sm:w-auto"
                      onClick={() => setSelectedExam(exam)}
                    >
                      Enter Marks
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enter Marks Dialog */}
        <Dialog open={!!selectedExam} onOpenChange={() => setSelectedExam(null)}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Enter Marks - {selectedExam?.name}</DialogTitle>
            </DialogHeader>
            {selectedExam && (
              <EnterMarksForm
                examId={selectedExam.id}
                subjects={selectedExam.subjects}
                onSuccess={() => setSelectedExam(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
};

export default Exams;
