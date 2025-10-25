import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useFrappeCreateDoc } from "frappe-react-sdk";

// Guardian schema
const guardianSchema = z.object({
  guardian_name: z.string().min(1, "Guardian name is required"),
  relation: z.string().min(1, "Relation is required"),
  email_address: z.string().email("Invalid email address").optional(),
  mobile_number: z.string().optional(),
  alternate_number: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
});

// Main student schema
const studentSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),
  student_email_id: z.string().email("Invalid email address"),
  student_mobile_number: z.string().optional(),
  joining_date: z.string().optional(),
  date_of_birth: z.string().optional(),
  blood_group: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  address_line_1: z.string().optional(),
  address_line_2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  date_of_leaving: z.string().optional(),
  leaving_certificate_number: z.string().optional(),
  reason_for_leaving: z.string().optional(),
  // Guardian fields
  guardians: z
    .array(guardianSchema)
    .min(1, "At least one guardian is required"),
});

type StudentFormValues = z.infer<typeof studentSchema>;
type GuardianFormValues = z.infer<typeof guardianSchema>;

interface AddStudentFormProps {
  onSuccess?: () => void;
}

export const AddStudentForm = ({ onSuccess }: AddStudentFormProps) => {
  const { createDoc, loading } = useFrappeCreateDoc();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      student_email_id: "",
      student_mobile_number: "",
      joining_date: new Date().toISOString().split("T")[0],
      date_of_birth: "",
      blood_group: "",
      gender: "",
      nationality: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      date_of_leaving: "",
      leaving_certificate_number: "",
      reason_for_leaving: "",
      guardians: [
        {
          guardian_name: "",
          relation: "",
          email_address: "",
          mobile_number: "",
          alternate_number: "",
          occupation: "",
          address: "",
        },
      ],
    },
  });

  const onSubmit = async (data: StudentFormValues) => {
    try {
      await createDoc("Student", {
        ...data,
        // Generate student_name from first, middle, last names
        student_name: [data.first_name, data.middle_name, data.last_name]
          .filter(Boolean)
          .join(" "),
        // Set customer group manually
        customer_group: "Student",
      });

      toast.success("Student created successfully!");
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error creating student:", error);
      toast.error("Failed to create student. Please try again.");
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const relations = [
    "Father",
    "Mother",
    "Grandfather",
    "Grandmother",
    "Uncle",
    "Aunt",
    "Brother",
    "Sister",
    "Guardian",
    "Other",
  ];

  // Guardian management functions
  const addGuardian = () => {
    const currentGuardians = form.getValues("guardians");
    form.setValue("guardians", [
      ...currentGuardians,
      {
        guardian_name: "",
        relation: "",
        email_address: "",
        mobile_number: "",
        alternate_number: "",
        occupation: "",
        address: "",
      },
    ]);
  };

  const removeGuardian = (index: number) => {
    const currentGuardians = form.getValues("guardians");
    if (currentGuardians.length > 1) {
      form.setValue(
        "guardians",
        currentGuardians.filter((_, i) => i !== index)
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg bg-primary/10 p-2 w-full rounded-md">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>First Name </FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Michael" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="student_email_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="student_mobile_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1-555-0123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="joining_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Joining Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg bg-primary/10 p-2 w-full rounded-md">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="blood_group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
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
              name="gender"
              
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Gender" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nationality</FormLabel>
                  <FormControl>
                    <Input placeholder="Nationality" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="space-y-4">
          <h3 className="text-lg bg-primary/10 p-2 w-full rounded-md">
            Address
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="address_line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address_line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="Postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

     {/* Guardian Information Section */}
<div className="space-y-4">
  <div className="flex justify-between items-center">
    <h3 className="text-lg bg-primary/10 p-2 w-full rounded-md">
      Guardian Information
    </h3>
  </div>

  <p className="text-sm text-muted-foreground">
    Let’s add the student’s guardians — start with a parent or primary contact.
  </p>

  {form.watch("guardians").map((guardian, index) => (
    <div
      key={index}
      className="p-4 border rounded-lg space-y-4 bg-muted/10 hover:bg-muted/20 transition-all"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-base">
            Guardian {index + 1}{" "}
            {guardian.relation && (
              <span className="text-xs text-muted-foreground">
                ({guardian.relation})
              </span>
            )}
          </h4>
        </div>

        <div className="flex gap-2">
          {form.watch("guardians").length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="bg-destructive/10 text-destructive hover:bg-destructive/30 hover:text-destructive"
              onClick={() => removeGuardian(index)}
            >
              Remove
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`guardians.${index}.guardian_name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Guardian Name </FormLabel>
              <FormControl>
                <Input required placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`guardians.${index}.relation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Relation </FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  if (val === "Father" || val === "Mother") {
                    form.setValue(
                      `guardians.${index}.occupation`,
                      val === "Father" ? "Service / Business" : "Homemaker"
                    );
                  }
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {relations.map((relation) => (
                    <SelectItem key={relation} value={relation}>
                      {relation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

  

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`guardians.${index}.email_address`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="guardian@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`guardians.${index}.mobile_number`}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Mobile Number</FormLabel>
              <FormControl>
                <Input placeholder="+91-1XXXXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={`guardians.${index}.address`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Guardian’s home or office address"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  ))}

  <div className="flex justify-end">
    <Button
      className="bg-success/20 hover:bg-success/30 text-accent-foreground"
      type="button"
      variant="outline"
      size="sm"
      onClick={() => {
        addGuardian();
        setTimeout(() => {
          document
            .querySelector(".guardian-section:last-child input")
            
        }, 200);
      }}
    >
      + Add Another Guardian
    </Button>
  </div>
</div>


        {/* Exit Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg bg-primary/10 p-2 w-full rounded-md">
            Exit Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date_of_leaving"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Leaving</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaving_certificate_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leaving Certificate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Certificate number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="reason_for_leaving"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason For Leaving</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Reason for leaving the institution"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            {loading ? "Creating..." : "Create Student"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
