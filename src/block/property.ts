import { Block } from "../block";
import { Doc, Param } from "../doc";
import Config from "../util/config";

/**
 * Represents an property block
 */
export default class Property extends Block
{

    /**
     * @inheritdoc
     */
    protected pattern:RegExp = /^\s*(static)?\s*(protected|private|public)\s+(static)?\s*(\$[A-Za-z0-9_]+)\s*\=?\s*([^;]*)/m;

    /**
     * @inheritdoc
     */
    public parse():Doc
    {
        let params = this.match();

        let doc = new Doc('Undocumented variable');
        doc.template = Config.instance.get('propertyTemplate');

        if (params[5]) {
            doc.var = this.inferType(params[5]);
        } else {
            doc.var = 'type';
        }

        return doc;
    }
}
