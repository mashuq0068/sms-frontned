import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import studentsData from '@/mock/students.json';

const marksSchema = z.object({
  studentId: z.string().min(1, 'Please select a student'),
  subject: z.string().min(1, 'Please select a subject'),
  marksObtained: z.string().min(1, 'Marks obtained is required').refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    { message: 'Marks must be between 0 and 100' }
  ),
  maxMarks: z.string().min(1, 'Max marks is required'),
  remarks: z.string().optional(),
});

type MarksFormValues = z.infer<typeof marksSchema>;

interface EnterMarksFormProps {
  examId: string;
  subjects: Array<{ name: string; maxMarks: number; date: string }>;
  onSuccess?: () => void;
}

export const EnterMarksForm = ({ examId, subjects, onSuccess }: EnterMarksFormProps) => {
  const form = useForm<MarksFormValues>({
    resolver: zodResolver(marksSchema),
    defaultValues: {
      studentId: '',
      subject: '',
      marksObtained: '',
      maxMarks: '100',
      remarks: '',
    },
  });

  const selectedSubject = form.watch('subject');
  
  // Auto-fill max marks when subject is selected
  const handleSubjectChange = (value: string) => {
    const subject = subjects.find(s => s.name === value);
    if (subject) {
      form.setValue('maxMarks', subject.maxMarks.toString());
    }
  };

  const onSubmit = (data: MarksFormValues) => {
    console.log('Marks data:', { examId, ...data });
    toast.success('Marks entered successfully!');
    form.reset();
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="studentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {studentsData.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} ({student.rollNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleSubjectChange(value);
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subjects.map((subject, idx) => (
                    <SelectItem key={idx} value={subject.name}>
                      {subject.name} (Max: {subject.maxMarks})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="marksObtained"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marks Obtained</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="85" 
                    min="0"
                    max="100"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxMarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Marks</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    disabled 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remarks (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Excellent performance" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" className="w-full md:w-auto">
            Submit Marks
          </Button>
        </div>
      </form>
    </Form>
  );
};