QUEST_2065 = {
	title = 'IDS_PROPQUEST_REQUESTBOX_INC_000716',
	character = 'MaDa_RedRobeGirl',
	end_character = 'MaDa_RedRobeGirl',
	start_requirements = {
		min_level = 84,
		max_level = 94,
		job = { 'JOB_KNIGHT_MASTER', 'JOB_BLADE_MASTER', 'JOB_JESTER_MASTER', 'JOB_RANGER_MASTER', 'JOB_RINGMASTER_MASTER', 'JOB_BILLPOSTER_MASTER', 'JOB_PSYCHIKEEPER_MASTER', 'JOB_ELEMENTOR_MASTER', 'JOB_KNIGHT_HERO', 'JOB_BLADE_HERO', 'JOB_JESTER_HERO', 'JOB_RANGER_HERO', 'JOB_RINGMASTER_HERO', 'JOB_BILLPOSTER_HERO', 'JOB_PSYCHIKEEPER_HERO', 'JOB_ELEMENTOR_HERO' },
		previous_quest = '',
	},
	rewards = {
		gold = 0,
		exp = 88575313,
	},
	end_conditions = {
		items = {
			{ id = 'II_GEN_GEM_GEM_POIESPORE', quantity = 20, sex = 'Any', remove = true },
		},
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000717',
		},
		begin_yes = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000718',
		},
		begin_no = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000719',
		},
		completed = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000720',
		},
		not_finished = {
			'IDS_PROPQUEST_REQUESTBOX_INC_000721',
		},
	}
}
