import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BookOpen } from 'lucide-react';

const classesData = [
  { id: '1', name: '9-A', students: 35, teacher: 'Dr. James Smith', subjects: ['Math', 'Science', 'English'] },
  { id: '2', name: '9-B', students: 32, teacher: 'Ms. Emily Johnson', subjects: ['Math', 'English', 'History'] },
  { id: '3', name: '10-A', students: 38, teacher: 'Dr. James Smith', subjects: ['Math', 'Science', 'English'] },
  { id: '4', name: '10-B', students: 34, teacher: 'Mr. Robert Brown', subjects: ['Science', 'Chemistry', 'Biology'] },
];

const Classes = () => {
  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium">Classes</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage class sections and assignments</p>
          </div>
          <Button className="gap-2 w-full sm:w-auto">
            <BookOpen className="w-4 h-4" />
            Add Class
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {classesData.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Class {cls.name}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {cls.students}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Class Teacher</p>
                  <p className="font-medium">{cls.teacher}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Subjects</p>
                  <div className="flex flex-wrap gap-1">
                    {cls.subjects.map((subject, idx) => (
                      <Badge key={idx}  className="text-xs bg-success/30 text-foreground/70">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="sm">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Shell>
  );
};

export default Classes;