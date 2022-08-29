import { Blueprint } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { db } from "../lib/db";

type Props = {
  blueprints: Blueprint[];
};

const Home: NextPage<Props> = ({ blueprints }: Props) => {
  return (
    <>
      <Link href="/new">New rocket</Link>
      {blueprints.map((blueprint, i) => (
        <Link href={`/rockets/${blueprint.id}`} key={i}>{blueprint.title}</Link>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const blueprints = await db.blueprint.findMany({
    take: 20,
  });

  return {
    props: {
      blueprints,
    },
  };
};

export default Home;
