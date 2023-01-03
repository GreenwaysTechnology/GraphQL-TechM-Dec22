import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const prisma = new PrismaClient();

//Define Schema
const typeDefs = `
type Student {
    id: ID!
    email: String!
    fullName: String!
    dept: Department!
    enrolled: Boolean
    updatedAt: String
    createdAt: String
  }

  type Department {
    id: ID!
    name: String!
    description: String
    students: [Student]
    courses: [Course]
    updatedAt: String
    createdAt: String
  }

  type Teacher {
    id: ID!
    email: String!
    fullName: String!
    courses: [Course]
    type: TeacherType
    updatedAt: String
    createdAt: String
  }

  type Course {
    id: ID!
    code: String!
    title: String!
    description: String
    teacher: Teacher
    dept: Department
    updatedAt: String
    createdAt: String
  }

  input TeacherCreateInput {
    email: String!
    fullName: String!
    courses: [CourseCreateWithoutTeacherInput!]
  }

  input CourseCreateWithoutTeacherInput {
    code: String!
    title: String!
    description: String
  }

  type Query {
    enrollment: [Student!]
    students: [Student!]
    student(id: ID!): Student
    departments: [Department!]!
    department(id: ID!): Department
    courses: [Course!]!
    course(id: ID!): Course
    teachers: [Teacher!]!
    teacher(id: ID!): Teacher
  }

  type Mutation {
    registerStudent(email: String!, fullName: String!, deptId: Int!): Student!
    enroll(id: ID!): Student
    createTeacher(data: TeacherCreateInput!): Teacher!
    createCourse(code: String!, title: String!, teacherEmail: String): Course!
    createDepartment(name: String!, description: String): Department!
  }

enum TeacherType {
  FULLTIME
  PARTTIME
}


`

const Student = {
    id: (parent, args, context, info) => parent.id,
    email: (parent) => parent.email,
    fullName: (parent) => parent.fullName,
    enrolled: (parent) => parent.enrolled,
    dept: (parent, args) => {
        return prisma.department.findFirst({
            where: { id: parent.dept },
        });
    },
};

const Department = {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    description: (parent) => parent.description,
    students: (parent, args) => {
        return prisma.department.findUnique({
            where: { id: parent.id },
        }).students();
    },
    courses: (parent, args) => {
        return prisma.department.findUnique({
            where: { id: parent.id },
        }).courses();
    },
};

const Teacher = {
    id: (parent) => parent.id,
    email: (parent) => parent.email,
    fullName: (parent) => parent.fullName,
    courses: (parent, args) => {
        return prisma.teacher.findUnique({
            where: { id: parent.id },
        }).courses();
    },
};

const Course = {
    id: (parent) => parent.id,
    code: (parent) => parent.code,
    title: (parent) => parent.title,
    description: (parent) => parent.description,
    teacher: (parent, args) => {
        return prisma.course.findUnique({
            where: { id: parent.id },
        }).teacher();
    },
    dept: (parent, args) => {
        return prisma.course.findUnique({
            where: { id: parent.id },
        }).dept();
    },
};

//
const Mutation = {
    registerStudent: (parent, args) => {
        return prisma.student.create({
            data: {
                email: args.email,
                fullName: args.fullName,
                dept: args.deptId && {
                    connect: { id: args.deptId },
                },
            },
        });
    },
    enroll: (parent, args) => {
        return prisma.student.update({
            where: { id: Number(args.id) },
            data: {
                enrolled: true,
            },
        });
    },

    createTeacher: (parent, args) => {
        return prisma.teacher.create({
            data: {
                email: args.data.email,
                fullName: args.data.fullName,
                courses: {
                    create: args.data.courses,
                },
            },
        });
    },

    createCourse: (parent, args) => {
        console.log(parent, args)
        return prisma.course.create({
            data: {
                code: args.code,
                title: args.title,
                teacher: args.teacherEmail && {
                    connect: { email: args.teacherEmail },
                },
            },
        });
    },

    createDepartment: (parent, args) => {
        return prisma.department.create({
            data: {
                name: args.name,
                description: args.description,
            },
        });
    },
};

//Define Resolver
const resolvers = {

    Student,
    Department,
    Teacher,
    Course,
    //Query
    Query: {
        enrollment: (parent, args) => {
            return prisma.student.findMany({
                where: { enrolled: true },
            });
        },
        student: (parent, args) => {
            return prisma.student.findFirst({
                where: { id: Number(args.id) },
            });
        },

        students: (parent, args) => {
            return prisma.student.findMany({});
        },

        departments: (parent, args) => {
            return prisma.department.findMany({});
        },

        department: (parent, args) => {
            return prisma.department.findFirst({
                where: { id: Number(args.id) },
            });
        },

        courses: (parent, args) => {
            return prisma.course.findMany({});
        },

        course: (parent, args) => {
            return prisma.course.findFirst({
                where: { id: Number(args.id) },
            });
        },

        teachers: (parent, args) => {
            return prisma.teacher.findMany({});
        },

        teacher: (parent, args) => {
            return prisma.teacher.findFirst({
                where: { id: Number(args.id) },
            });
        },
    },
    Mutation
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
})
//start the webserver and deploy
const { url } = await startStandaloneServer(server, {
    listen: {
        port: 4000
    }
})
console.log(`Apollo Server is Ready at ${url}`)
