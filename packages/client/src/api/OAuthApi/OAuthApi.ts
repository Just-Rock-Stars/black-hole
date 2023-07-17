import { baseAxiosInstance } from '@api/baseAxiosInstance';

class OAuthApi {
  private get redirectUri() {
    return window.location.origin;
  }

  public async auth(): Promise<void> {
    const id = await this.getId();
    this.redirectToYandexOAuthPage(id);
  }

  private redirectToYandexOAuthPage(id: string): void {
    window.location.assign(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}&redirect_uri=${this.redirectUri}`
    );
  }

  private async getId(): Promise<string> {
    const response = await baseAxiosInstance.get('/oauth/yandex/service-id', {
      params: {
        redirect_uri: this.redirectUri,
      },
    });

    const { service_id: id } = response.data;

    return id;
  }

  public async getAccessToken(code: string): Promise<void> {
    await baseAxiosInstance.post('/oauth/yandex', {
      redirect_uri: this.redirectUri,
      code,
    });
  }
}

export const oAuthApi = new OAuthApi();
