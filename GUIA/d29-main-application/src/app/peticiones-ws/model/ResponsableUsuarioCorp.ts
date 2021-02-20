import { Response } from '@angular/http';
import { User, toUsuario } from '../../admin/admin.service';

export class ResponsableUsuarioCorp {
  constructor(
    public id: Number,
    public usuarioCorp: string,
    public responsable: User,
  ) { }

  static getNewInstance(): ResponsableUsuarioCorp {
    return new ResponsableUsuarioCorp(null, '', User.getNewInstance());
  }
}

export function toResponsableUsuarioCorp(r: any): ResponsableUsuarioCorp {
  let output: ResponsableUsuarioCorp = null;
  if (r) {
    output = <ResponsableUsuarioCorp>({
      id: r.id,
      usuarioCorp: r.usuarioCorp,
      responsable: toUsuario(r.responsable)
    });
  }
  return output;
}

export function toResponsableUsuarioCorpList(r: any): ResponsableUsuarioCorp[] {
  let output: ResponsableUsuarioCorp[] = [];
  if (r) {
    output = r.map(toResponsableUsuarioCorp);
  }
  return output;
}

export function mapResponsableUsuarioCorp(response: Response): ResponsableUsuarioCorp {
  let responseJson = response.json();
  let output: ResponsableUsuarioCorp = null;
  if (responseJson) {
    output = toResponsableUsuarioCorp(responseJson);
  }
  return output;
}

export function mapResponsableUsuarioCorpList(response: Response): ResponsableUsuarioCorp[] {
  let responseJson = response.json();
  let output: ResponsableUsuarioCorp[] = [];
  if (responseJson) {
    output = responseJson.map(toResponsableUsuarioCorp);
  }
  return output;
}
