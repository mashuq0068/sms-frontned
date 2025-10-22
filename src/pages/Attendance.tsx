import { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useStudents } from '@/hooks/useStudents';
import { Check, X, Clock, Save } from 'lucide-react';
import { toast } from 'sonner';

const Attendance = () => {
  const { students } = useStudents();
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  const classStudents = students.filter((s) => s.class === selectedClass);

  const toggleAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? 'present' : status,
    }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, 'present' | 'absent' | 'late'> = {};
    classStudents.forEach((s) => {
      allPresent[s.id] = 'present';
    });
    setAttendance(allPresent);
    toast.success('All students marked as present');
  };

  const handleSave = () => {
    toast.success('Attendance saved successfully');
  };

  const getStatusColor = (status: 'present' | 'absent' | 'late' | undefined) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'absent':
        return 'bg-destructive text-destructive-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const stats = {
    total: classStudents.length,
    present: Object.values(attendance).filter((s) => s === 'present').length,
    absent: Object.values(attendance).filter((s) => s === 'absent').length,
    late: Object.values(attendance).filter((s) => s === 'late').length,
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-medium">Attendance</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Mark and track student attendance</p>
          </div>
          <Button onClick={handleSave} className="gap-2 w-full sm:w-auto">
            <Save className="w-4 h-4" />
            Save Attendance
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-medium">{stats.total}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-2xl font-medium text-success">{stats.present}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="text-2xl font-medium text-destructive">{stats.absent}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Late</p>
              <p className="text-2xl font-medium text-warning">{stats.late}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <CardTitle>Mark Attendance</CardTitle>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="9-A">9-A</SelectItem>
                      <SelectItem value="10-A">10-A</SelectItem>
                      <SelectItem value="10-B">10-B</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={markAllPresent} variant="outline" size="sm" className="w-full sm:w-auto">
                    Mark All Present
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">{student.rollNumber}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{student.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      <Button
                        size="sm"
                        variant={attendance[student.id] === 'present' ? 'default' : 'outline'}
                        onClick={() => toggleAttendance(student.id, 'present')}
                        className="flex-1 sm:flex-initial"
                      >
                        <Check className="w-4 h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Present</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={attendance[student.id] === 'late' ? 'default' : 'outline'}
                        onClick={() => toggleAttendance(student.id, 'late')}
                        className="flex-1 sm:flex-initial"
                      >
                        <Clock className="w-4 h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Late</span>
                      </Button>
                      <Button
                        size="sm"
                        variant={attendance[student.id] === 'absent' ? 'default' : 'outline'}
                        onClick={() => toggleAttendance(student.id, 'absent')}
                        className="flex-1 sm:flex-initial"
                      >
                        <X className="w-4 h-4 sm:mr-1" />
                        <span className="hidden sm:inline">Absent</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Attendance;
