QUEST_2022 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000243',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 39,
		max_level = 44,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 39000,
		exp = 311984,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_KALIN', quantity = 35, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000244',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000245',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000246',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000247',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000248',
		},
	}
}
