import ExpressServer from './express.server';
// import DomainUseCasesSingleton from '../../domain/dominUseCases.singleton';

export default class ExpressSingleton { 
    private static instance: ExpressSingleton;
    public adapter: ExpressServer;


    private constructor() { }

    public static async getInstance(): Promise<ExpressSingleton> {
        if (!ExpressSingleton.instance) {
            // const domainUseCasesInstance = await DomainUseCasesSingleton.getInstance()
            // const gQLSchema = GqlSchemaFactory(domainUseCasesInstance.DomainUseCases)

            ExpressSingleton.instance = new ExpressSingleton();
            ExpressSingleton.instance.adapter = new ExpressServer();
            // ExpressSingleton.instance.adapter.setupGraphQl(gQLSchema);
        }
        return ExpressSingleton.instance;
    }
}
