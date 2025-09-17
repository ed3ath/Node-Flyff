QUEST_2020 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000221',
	character = 'MaSa_Lancomi',
	end_character = 'MaSa_Lancomi',
	start_requirements = {
		min_level = 35,
		max_level = 40,
		job = { 'JOB_ASSIST', 'JOB_MERCENARY', 'JOB_MAGICIAN', 'JOB_ACROBAT' },
		previous_quest = '',
	},
	rewards = {
		gold = 35000,
		exp = 96526,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_BOBAND', quantity = 30, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000222',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000223',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000224',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000225',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000226',
		},
	}
}
