type ContractShowCaseProps = {
  params: {
    contract: string;
  };
};
export default function ContractShowCase(props: ContractShowCaseProps) {
  const { contract } = props.params;

  return (
    <div className="container py-5 sm:py-16">
      <p className="text-2xl font-semibold">Contract Showcase {contract}</p>
    </div>
  );
}
