import { useState } from 'react';
import { Shell } from '@/components/layout/Shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import timetableData from '@/mock/timetable.json';

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const classTimetable = timetableData['10-A' as keyof typeof timetableData];

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-medium">Timetable</h1>
            <p className="text-muted-foreground">View and manage class schedules</p>
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              <SelectItem value="9-A">9-A</SelectItem>
              <SelectItem value="10-A">10-A</SelectItem>
              <SelectItem value="10-B">10-B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule - {selectedClass}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {weekDays.map((day) => (
                <div key={day} className="border rounded-lg overflow-hidden">
                  <div className="bg-primary text-primary-foreground px-4 py-2 font-medium">
                    {day}
                  </div>
                  <div className="grid grid-cols-4 gap-2 p-3">
                    {classTimetable[day as keyof typeof classTimetable]?.map((period) => (
                      <div
                        key={period.period}
                        className="p-3 rounded-lg border transition-smooth hover:shadow-md"
                        style={{ borderLeftColor: period.color, borderLeftWidth: '4px' }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground">
                            Period {period.period}
                          </span>
                          <span className="text-xs text-muted-foreground">{period.time}</span>
                        </div>
                        <p className="font-medium">{period.subject}</p>
                        <p className="text-sm text-muted-foreground">{period.teacher}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
};

export default Timetable;
