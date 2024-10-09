
import db from './index';

interface actionProps {
    name: string;
    description?: string;
    actionType: 'TRIGGER' | 'ACTION';
    template?: {
        name: string;
        description?: string;
        param?: {
            name: string;
            description?: string;
            type: 'STRING' | 'NUMBER' | 'BOOLEAN';
            options?: string[];

        }
    }
}
